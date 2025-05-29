import asyncio
from datetime import datetime
import logging
from typing import Any, AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPAuthorizationCredentials
from pydantic_core import to_jsonable_python
from pydantic_ai.messages import UserPromptPart
from sqlalchemy.orm import Session

from .chat_memory import chat_memory

from .llm_agent import stream_response
from .models import Message
from . import schemas
from database import get_db
from utils.auth import validate_token, security
from utils.logger import logger

router = APIRouter()

@router.post("", response_model=schemas.ChatResponse,include_in_schema=False)
@router.post("/", response_model=schemas.ChatResponse)
async def get_all_users(chat_request: schemas.ChatRequest, db: Session = Depends(get_db), token: HTTPAuthorizationCredentials = Depends(security)):
    await validate_token(token)  # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    try:
        chat_id = 1
        response = stream_response(chat_request.message, chat_memory.get(chat_id))

        async def sse_generator(response) -> AsyncGenerator[str, None]:
            async for item in response:
                logger.debug(f'Received response chunk: {item.model_dump_json()}')
                if isinstance(item, schemas.MessageHistory):
                    [chat_memory.append(chat_id, part) for part in item.messages]
                    logger.info(f"chat memory: {chat_memory.get(chat_id)}")
                    # TODO: Move adding history to db to extra endpoint /chats/{chat_id}/close
                    for chunk in item.messages:
                        db.add(Message(
                            chat_id=chat_id,
                            sender=['user' if isinstance(chunk, UserPromptPart) else 'assistant'],
                            message=chunk,
                        ))
                    db.commit()
                    continue
                await asyncio.sleep(0)
                yield item.model_dump_json()

        return StreamingResponse(content=sse_generator(response), media_type="text/event-stream")
    except Exception as e:
        logger.error(f"Error retrieving users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")
