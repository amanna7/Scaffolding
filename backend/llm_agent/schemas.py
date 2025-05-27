from typing import Any, List, Optional
from pydantic import BaseModel
from pydantic_ai.messages import ModelMessage

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class MessageHistory(BaseModel):
    messages: List[ModelMessage]