import asyncio
from pydantic import BaseModel

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from rich.console import Console
from rich.live import Live

ai_model_name = 'llama3.2'

ai_model = OpenAIModel(
    model_name=ai_model_name, provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
agent = Agent(ai_model)


async def stream_response():
    console = Console()
    with Live('', console=console, vertical_overflow='visible') as live:
        async with agent.run_stream('Write a stroy about a lion and a tiger') as response:
            async for message in response.stream():
                live.update(message)

asyncio.run(stream_response())
