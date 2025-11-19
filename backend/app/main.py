from time import perf_counter
from fastapi import FastAPI, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from scalar_fastapi import get_scalar_api_reference
from uuid import uuid4, UUID
from typing import Annotated

from app.api.router import master_router
from app.core.exceptions import add_exception_handlers
from app.worker.tasks import add_log
from app.api.schemas.tag import APITag


description = """
Delivery management system for selllers and delivery agents

### Seller
- Submit shipment effortlessly
- Share tracking link with customers

### Delivery agent
- Auto accept shipments
- Track and update shipment status
- Email and SMS notification
"""


app = FastAPI(
    title="FastShip",
    description=description,
    docs_url=None,
    redoc_url=None,
    contact={
        "name": "Kofi Kusi Appau",
        "url": "https://fastship.com/support",
        "email": "kusi@fastship.com"
    },
    openapi_tags=[
        {
            "name": APITag.SHIPMENT,
            "description": "Operations related to shipments"
        },
        {
            "name": APITag.SELLER,
            "description": "Operations related to sellers" 
        },
        {
            
            "name": APITag.DELIVERY_PARTNER,
            "description": "Operations related to delivery agents"
        },
    ]
)

# Add all enpoints
app.include_router(master_router)

# Add custom exception handlers
add_exception_handlers(app) 

@app.middleware("http")
async def custom_middleware(request: Request, call_next):
    start = perf_counter()

    response: Response = await call_next(request)

    end = perf_counter()
    time_taken = round(end - start, 2)

    add_log.delay(f"{request.method} {request.url} ({response.status_code}) {time_taken}")

    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"]
)

def get_id():
    return uuid4()

@app.get("/")
def read_root(id: Annotated[UUID, Depends(get_id)]):
    return {"id": str(id)}

### Scalar API Documentation
@app.get("/docs", include_in_schema=False)
def get_scalar_docs():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title="Scalar API",
    )
