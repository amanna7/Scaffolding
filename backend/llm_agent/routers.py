import asyncio
import logging
from typing import Any, AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPAuthorizationCredentials
from pydantic_core import to_jsonable_python
from sqlalchemy.orm import Session

from .llm_agent import stream_response
from . import schemas
from database import get_db
from utils.auth import validate_token, security
from utils.logger import logger

router = APIRouter()

@router.post("", response_model=schemas.ChatResponse,include_in_schema=False)
@router.post("/", response_model=schemas.ChatResponse)
async def get_all_users(request: schemas.ChatRequest, db: Session = Depends(get_db), token: HTTPAuthorizationCredentials = Depends(security)):
    await validate_token(token)  # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    try:
        # TODO: read message history from memory or database
        response = stream_response(request.message, None)

        async def sse_generator(response) -> AsyncGenerator[str, None]:
            async for item in response:
                logger.debug(f'Received response chunk: {item.model_dump_json()}')
                if isinstance(item, schemas.MessageHistory):
                    # TODO: save message history in memory
                    continue
                await asyncio.sleep(0)
                yield item.model_dump_json()

        return StreamingResponse(content=sse_generator(response), media_type="text/event-stream")
    except Exception as e:
        logger.error(f"Error retrieving users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")
