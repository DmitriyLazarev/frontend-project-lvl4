lint:
	npx eslint .
install:
	npm ci
start:
	make build
	npx start-server -s ./build
build:
	react-scripts build
start-frontend:
	react-scripts start
start-backend:
	npx start-server -p 5001
run:
	make start-backend & make start-frontend
