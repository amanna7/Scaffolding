from typing import Any, List, Optional
from pydantic import BaseModel
from pydantic_ai.messages import ModelMessage

class ChatRequest(BaseModel):
    message: str
    message_history: Optional[List[ModelMessage]] = None

class ChatResponse(BaseModel):
    response: str
    message_history: Optional[Any] = None
