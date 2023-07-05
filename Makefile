lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start-backend-dev:
	npx start-server -a localhost

start:
	make start-backend & make start-frontend

start-dev:
	make start-backend-dev & make start-frontend