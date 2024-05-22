create_postgres: 
	docker run --name postgres_pbin -p 5432:5432 \
	-v ./:/docker-entrypoint-initdb.d \
	-e POSTGRES_PASSWORD=mypass123 \
	-d postgres:latest
