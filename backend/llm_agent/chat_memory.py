from typing import Dict, List
from pydantic_ai.messages import ModelMessage

class ChatMemory:
    def __init__(self):
        self._memory: Dict[int, List[ModelMessage]] = {}

    def get(self, chat_id: int) -> List[ModelMessage]:
        return self._memory.get(chat_id, [])

    def append(self, chat_id: int, message: ModelMessage):
        if chat_id not in self._memory:
            self._memory[chat_id] = []
        self._memory[chat_id].append(message)

    def clear(self, chat_id: int):
        if chat_id in self._memory:
            del self._memory[chat_id]

chat_memory = ChatMemory()