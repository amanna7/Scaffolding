from pydantic import BaseModel

from pydantic_ai import Agent
from agent.ai_model import get_ai_model
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool
from pydantic_ai.usage import UsageLimits

ai_model_name = 'claude-3-5-sonnet-latest'

ai_model = get_ai_model(ai_model_name)

agent = Agent(ai_model, tools=[duckduckgo_search_tool()])

result1 = agent.run_sync(
    'Look up the country with the highest mountain and then the most famous actor in the country you found. Respond in one sentence',
    usage_limits=UsageLimits(response_tokens_limit=300)
)
print(result1.output)
print(result1.usage())

for item in result1.all_messages():
    print()
    print(item)

print()
print()
result2 = agent.run_sync(
    'What sources did you base your previous answer on? Respond with a short list of sources.', message_history=result1.all_messages(),
    usage_limits=UsageLimits(response_tokens_limit=300)
)
print(result2.output)

for item in result2.all_messages():
    print()
    print(item)

