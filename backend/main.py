from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from users import models as user_models
from users.routers import router as user_router
from llm_agent.routers import router as llm_router

app = FastAPI(redirect_slashes=False)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router, prefix="/api/users", tags=["users"])
app.include_router(llm_router, prefix="/api/chat", tags=["chat"])

# user_models.Base.metadata.create_all(bind=engine) enable this if you don't want to use migrations
