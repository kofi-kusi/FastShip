from fastapi import FastAPI, HTTPException, Request, Response, status
from fastapi.exceptions import ResponseValidationError
from fastapi.responses import JSONResponse


class FastShipError(Exception):
    """Base exception for all exceptions in fastship api"""
    # status_code to be returned for this exception
    # when it is handled
    status = status.HTTP_400_BAD_REQUEST


class EntityNotFound(FastShipError):
    """Entity not found in database"""

    status = status.HTTP_404_NOT_FOUND


class ClientNotAuthorized(FastShipError):
    """Client is not authorized to perform the action"""

    status = status.HTTP_401_UNAUTHORIZED


class ClientNotVerified(FastShipError):
    """Client is not verified"""

    status = status.HTTP_401_UNAUTHORIZED


class InvalidInput(FastShipError):
    """No data provided to update"""


class BadCredentials(FastShipError):
    """User email or password is incorrect"""

    status = status.HTTP_401_UNAUTHORIZED


class InvalidToken(FastShipError):
    """Access token is invalid or expired"""

    status = status.HTTP_401_UNAUTHORIZED


class DeliveryPartnerNotAvailable(FastShipError):
    """Delivery partner/s do not service the destination"""

    status = status.HTTP_406_NOT_ACCEPTABLE


class DeliveryPartnerCapacityExceeded(FastShipError):
    """Delivery partner has reached their max handling capacity"""

    status = status.HTTP_406_NOT_ACCEPTABLE

def _get_handler(status: int, detail: str):
    def handler(request: Request, exception: Exception) -> Response:
        from rich import print, panel
        print(panel.Panel(f"Handled: {exception.__class__.__name__}"))
        raise HTTPException(
            status_code=status,
            detail=detail
        )
    return handler

def add_exception_handlers(app: FastAPI):
    for subclass in FastShipError.__subclasses__():
        app.add_exception_handler(
            subclass,
            _get_handler(subclass.status, subclass.__doc__ or "An error occurred")
        )
        
    @app.exception_handler(status.HTTP_500_INTERNAL_SERVER_ERROR)
    def internal_server_error_handler(request, exception):
        return JSONResponse(
            content={"derail": f"Something went wrong"},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            headers={
                "X-Error": f"{exception}"
            }
        )
                                          