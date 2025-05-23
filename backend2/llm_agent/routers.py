from typing import List, Optional
from pydantic import BaseModel
from llm_agent.agent import agent
from fastapi import APIRouter, HTTPException


router = APIRouter()


class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    messages: Optional[str] = None

class ChatState(BaseModel):
    state: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not agent:
        raise HTTPException(status_code=503, detail="Agent not initialized")
    
    try:
        print(f"DEBUG: {request.message}")
        response = agent(request.message)
        print(f"✅ Response generated: {response}...")
        
        return ChatResponse(
            response=str(response),
            messages=str(agent.messages),
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")


@router.post("/state", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not agent:
        raise HTTPException(status_code=503, detail="Agent not initialized")
    
    try:
        
        return ChatResponse(
            state=str(agent.state),
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")