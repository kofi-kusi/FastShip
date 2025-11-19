from fastapi.testclient import TestClient
from httpx import ASGITransport, AsyncClient
import pytest_asyncio
from sqlmodel import SQLModel
from app.database.session import get_session
from app.main import app, get_id
import pytest
from uuid import UUID
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.database import models


engine = create_async_engine(
    url="sqlite+aiosqlite:///:memory:"
)

async def get_session_override():
    async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    with async_session() as session:
        yield session

@pytest_asyncio.fixture(scope="session")
async def client():
    async with AsyncClient(
        transport=ASGITransport(app),
        base_url="http://test/",
    ) as client:
        yield client

# Dependency override
def get_id_override():
    return UUID("116b9ca4-3cda-4605-8c20-edd2490d3a10")

@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_and_teardown():

    print("🧪 Starting testing...")

    app.dependency_overrides[get_id] = get_id_override
    app.dependency_overrides[get_session] = get_session_override

    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.create_all)

    yield

    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.drop_all)

    app.dependency_overrides.clear()

    print("✅ finished!")