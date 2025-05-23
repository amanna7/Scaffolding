from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider

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
