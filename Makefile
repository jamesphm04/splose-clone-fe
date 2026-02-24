dev:
	docker compose -f docker-compose.dev.yaml up --build

prod:
	docker compose -f docker-compose.prod.yaml up --build -d

stop:
	docker compose -f docker-compose.dev.yaml down

logs:
	docker compose -f docker-compose.dev.yaml logs -f

clean:
	docker compose -f docker-compose.dev.yaml down -v --rmi all