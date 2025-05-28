from typing import AsyncGenerator
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider
from pydantic_ai.usage import UsageLimits
from pydantic_ai.messages import ModelMessage
from pydantic_core import to_jsonable_python
from utils.logger import logger

from .schemas import ChatResponse, MessageHistory

ai_model_name = 'claude-3-5-sonnet-latest'

def get_ai_model(model_name):
    if model_name in ['llama3.2', 'qwen3']:
        ai_model = OpenAIModel(
            model_name=model_name, provider=OpenAIProvider(base_url='http://localhost:11434/v1')
        )
    else:
        ai_model = AnthropicModel(
            model_name=model_name, provider=AnthropicProvider()
        )
    return ai_model


ai_model = get_ai_model(ai_model_name)

agent = Agent(ai_model)


async def stream_response(chat_request: str, chat_history: list[ModelMessage] | None) -> AsyncGenerator[ChatResponse | MessageHistory, None]:
    async with agent.run_stream(chat_request, usage_limits=UsageLimits(response_tokens_limit=1010), message_history=chat_history) as response:
        async for message in response.stream_text(delta=True):
            yield ChatResponse(response=message)
        new_message_history = to_jsonable_python(response.new_messages())
        logger.info(MessageHistory(messages=new_message_history).model_dump_json())
        yield MessageHistory(messages=new_message_history)
