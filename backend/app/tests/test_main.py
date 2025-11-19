from httpx import AsyncClient
import pytest


# @pytest.mark.asyncio
async def test_app(client: AsyncClient):
    response = await client.get("/")
    print(response.json())

    assert response.status_code == 200
    assert response.json() == {"id": "116b9ca4-3cda-4605-8c20-edd2490d3a10"}