from pydantic import BaseModel

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

ai_model_name = 'llama3.2'

class CityLocation(BaseModel):
    city: str
    country: str


ai_model = OpenAIModel(
    model_name=ai_model_name, provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
agent = Agent(ai_model, output_type=CityLocation)

result = agent.run_sync('Where were the olympics held in 2012?')
print(result.output)
#> city='London' country='United Kingdom'
print(result.usage())
"""
Usage(requests=1, request_tokens=57, response_tokens=8, total_tokens=65, details=None)
"""
for item in result.all_messages():
    print()
    print(item)
