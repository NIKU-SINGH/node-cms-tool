docker compose down
docker compose up -d --build
docker run  -e POSTGRES_PASSWORD=password -p 5432:5432 postgres