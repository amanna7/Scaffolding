from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone

from database import Base  # tipico import

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Uuid, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id")) # qui ricordati di prendere lo user id collegato con kinde 
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    closed_at = Column(DateTime, nullable=True)

    messages = relationship("Message", back_populates="chat")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    chat_id = Column(Integer, ForeignKey("chats.id"))
    sender = Column(String)  # es: "user" o "assistant"
    message = Column(String)

    chat = relationship("Chat", back_populates="messages")