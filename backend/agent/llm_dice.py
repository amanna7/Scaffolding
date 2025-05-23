import random
from pydantic_ai import Agent, RunContext
from agent.ai_model import get_ai_model

ai_model_name = 'claude-3-5-sonnet-latest'

ai_model = get_ai_model(ai_model_name)

agent = Agent(
    ai_model,  
    deps_type=str,  
    system_prompt=(
        "You're a dice game, you should roll the die and see if the number "
        "you get back matches the user's guess. Two players play against each other in 3 rounds. "
        "After each turn tell them if they were correct and mention their name. "
        "The game ends after 3 rounds. Tell them who won according to the number of correct guesses."
    ),
)


@agent.tool_plain  
def roll_die() -> str:
    """Roll a six-sided die and return the result."""
    return str(random.randint(1, 6))


@agent.tool  
def get_player_name(ctx: RunContext[str]) -> str:
    """Get the player's name."""
    return ctx.deps


dice_result = agent.run_sync('My guess is 4', deps='Anne')  
print(dice_result.output)
for name in ['Marco', 'Anne', 'Marco', 'Anne', 'Marco']:
    dice_result = agent.run_sync('My guess is 5', deps=name, message_history=dice_result.all_messages())  
    print(dice_result.output)

for item in dice_result.all_messages():
    print()
    print(item)