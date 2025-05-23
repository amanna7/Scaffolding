import asyncio
from pydantic import BaseModel

from pydantic_ai import Agent
from agent.ai_model import get_ai_model
from rich.console import Console
from rich.live import Live

ai_model_name = 'claude-3-5-sonnet-latest'

ai_model = get_ai_model(ai_model_name)

agent = Agent(ai_model)


async def stream_response():
    console = Console()
    with Live('', console=console, vertical_overflow='visible') as live:
        async with agent.run_stream('Write a stroy about a lion and a tiger') as response:
            async for message in response.stream():
                live.update(message)

asyncio.run(stream_response())
