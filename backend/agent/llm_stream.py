import asyncio
from pydantic import BaseModel

from pydantic_ai import Agent
from ai_model import get_ai_model
from rich.console import Console
from rich.live import Live
from pydantic_ai.usage import UsageLimits

ai_model_name = 'claude-3-5-sonnet-latest'

ai_model = get_ai_model(ai_model_name)

agent = Agent(ai_model)


async def stream_response():
    console = Console()
    with Live('', console=console, vertical_overflow='visible') as live:
        async with agent.run_stream('Write a stroy about a lion and a tiger with no more than 1000 characters', usage_limits=UsageLimits(response_tokens_limit=1010)) as response:
            async for message in response.stream():
                live.update(message)

asyncio.run(stream_response())
