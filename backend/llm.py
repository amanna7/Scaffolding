from pydantic import BaseModel

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool

ai_model_name = 'llama3.2'


ai_model = OpenAIModel(
    model_name=ai_model_name, provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
agent = Agent(ai_model, tools=[duckduckgo_search_tool()])

result1 = agent.run_sync('Look up the country with the highest population and then the most famous actor in the country you found using duckduckgo')
# Very flaky, sometimes it makes one tool call and sometimes a toolcall that has two parts
print(result1.output)
print(result1.usage())

for item in result1.all_messages():
    print()
    print(item)

print()
print()
result2 = agent.run_sync('What are the sources for your previous answer?', message_history=result1.new_messages())
print(result2.output)

for item in result2.all_messages():
    print()
    print(item)

# Does not work too well, it does the tool call again