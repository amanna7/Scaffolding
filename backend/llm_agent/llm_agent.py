from typing import AsyncGenerator
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider
from pydantic_ai.usage import UsageLimits

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


async def stream_response(request: str) -> AsyncGenerator[str, None]:
    async with agent.run_stream(request, usage_limits=UsageLimits(response_tokens_limit=1010)) as response:
        async for message in response.stream_text(delta=True):
            yield message
