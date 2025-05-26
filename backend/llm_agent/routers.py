import logging
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
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
        return schemas.ChatResponse(response="This is a placeholder response", messages=request.message)
    except Exception as e:
        logger.error(f"Error retrieving users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")
