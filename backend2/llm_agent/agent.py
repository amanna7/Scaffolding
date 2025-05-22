import random
from strands import Agent, tool
from strands.models.litellm import LiteLLMModel
from strands.models.anthropic import AnthropicModel
import os
from dotenv import load_dotenv


load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

# LLM_API_KEY = os.getenv("LLM_API_KEY")
# if not LLM_API_KEY:
#     raise ValueError("API key not found. Please set LLM_API_KEY in your .env file.")


@tool
def get_weather(city: str) -> str:
    """Get weather for a city.
    Args:
        city: The name of the city
    """
    
    weather_data = {
        "tokyo": "Sunny, 22°C",
        "london": "Rainy, 15°C", 
        "new york": "Cloudy, 18°C",
        "paris": "Partly cloudy, 20°C"
    }
    result = weather_data.get(city.lower(), f"Weather data not available for {city}")
    print(f"DEBUG: returning result='{result}'")  # Add debug
    return result

@tool
def search_user_location(user: str) -> str:
    """Get the location of a user.
    Args:
        user: The name of the user
    """
    locations = ["tokyo", "london", "new york", "paris"]
    random_location = random.choice(locations)
    return f"User current location is {random_location}."

model = AnthropicModel(
    client_args={
        "api_key": ANTHROPIC_API_KEY,
    },
    max_tokens=1028,
    model_id="claude-3-haiku-20240307",
    params={
        "temperature": 0.7,
    }
)

# model = LiteLLMModel(
#     client_args={
#         "api_key": LLM_API_KEY,
#     },
#     model_id="gemini/gemini-1.5-flash",
#     params={
#         "max_tokens": 1000,
#         "temperature": 0.7,
#     }
# )

agent = Agent(
    model=model,
    tools=[get_weather],
    system_prompt="""You are a helpful assistant that can autonomously use tools to answer questions.
    
    When given a question:
    1. Think about what information you need
    2. Use appropriate tools to gather that information  
    3. Use multiple tools if needed
    4. Provide a comprehensive answer based on the tool results
    
    Always explain your reasoning process."""
)

def test_autonomous_behavior():
    
    print(agent.tool_names)
    
    test_questions = [
        # Simple tool usage
        "What's the weather in Tokyo?",
        # Multi-step reasoning
       "What's the weather in the location of user UserABC?",

    ]
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{'='*60}")
        print(f"TEST {i}: {question}")
        print('='*60)
        response = agent(question)
        print(f"AGENT RESPONSE:\n{response}")

if __name__ == "__main__":
    test_autonomous_behavior()