lint:
	npx eslint .
install:
	npm ci
build:
	npm run build
start-frontend:
	npm start
start-backend:
	npx start-server -p 5001
start:
	make start-backend & make start-frontend

