# FastShip 🚚

Delivery management system for sellers and delivery partners.

- Backend 🧠: FastAPI + SQLModel/SQLAlchemy (async) + Postgres
- Background jobs 🧵: Celery + Redis (broker/backend)
- Frontend 🖥️: React (React Router 7 + Vite)

## Repo layout 🗂️

- `backend/` — FastAPI app, DB models/migrations, Celery tasks, email/SMS templates, tests
- `frontend/` — React Router app

## Prerequisites ✅

- Docker + Docker Compose (recommended), **or**
- Python 3.13+ (matches `backend/Dockerfile`) and Node.js 20+

## Quickstart (Docker) 🐳

From `backend/`:

```bash
cd backend
docker compose up --build
```

- API: `http://127.0.0.1:8000`
- API docs (Scalar): `http://127.0.0.1:8000/docs`

Notes:

- Docker Compose will read environment variables from `backend/.env` automatically.
- In `backend/docker-compose.yaml`, the `db` service does **not** set `POSTGRES_PASSWORD`. If the Postgres container fails to initialize, add `POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"` to the `db.environment` section (or set an auth method suitable for local dev).

## Local development 🧑‍💻

### Backend ⚙️

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Option A (recommended): uvicorn
uvicorn app.main:app --reload --port 8000

# Option B: fastapi-cli
# fastapi dev app/main.py --port 8000
```

Environment:

- Settings are loaded from `backend/.env` via `app/config.py` (Pydantic Settings).
- Do not commit real credentials. Use your own local values.

### Frontend 🎨

```bash
cd frontend
npm install
npm run dev
```

- App: `http://localhost:5173`
- The API base URL is currently hardcoded in `frontend/app/lib/api.ts` to `http://127.0.0.1:8000`.

## Database migrations 🗄️

Alembic config lives in `backend/alembic.ini` and migrations are in `backend/migrations/`.

Important:

- `backend/migrations/env.py` currently sets `sqlalchemy.url` to a hardcoded database URL. Review/update this before running migrations locally.

Run migrations (after verifying the URL):

```bash
cd backend
alembic upgrade head
```

## Background worker (Celery) 🧰

Run the worker (requires Redis):

```bash
cd backend
celery -A app.worker.tasks worker --loglevel=INFO
```

## Tests 🧪

Backend:

```bash
cd backend
pytest
```

Frontend:

```bash
cd frontend
npm run typecheck
```
