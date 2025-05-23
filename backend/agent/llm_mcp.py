import asyncio
from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStdio
from ai_model import get_ai_model

server = MCPServerStdio(  
    'deno',
    args=[
        'run',
        '-N',
        '-R=node_modules',
        '-W=node_modules',
        '--node-modules-dir=auto',
        'jsr:@pydantic/mcp-run-python',
        'stdio',
    ]
)

ai_model_name = 'claude-3-5-sonnet-latest'
ai_model = get_ai_model(ai_model_name)
agent = Agent(ai_model, mcp_servers=[server])


async def use_ai_with_mcp():
    async with agent.run_mcp_servers():
        result = await agent.run('How many days between 2000-01-01 and 2025-03-18?')
    print(result.output)
    #> There are 9,208 days between January 1, 2000, and March 18, 2025.
    for item in result.all_messages():
        print()
        print(item)

asyncio.run(use_ai_with_mcp())

