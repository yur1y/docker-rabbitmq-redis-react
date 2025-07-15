# Project README

## Overview

This project consists of a microservices architecture with a backend API service, a worker service, a frontend application, and dependencies managed with Docker. The services communicate with each other using RabbitMQ and Redis. This README provides instructions on how to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (including Docker Compose)
- [Node.js](https://nodejs.org/) (if you want to run services without Docker)
- [pnpm](https://pnpm.js.org/) (if you want to run services without Docker)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### 2. Build and Run the Services

You can use Docker Compose to build and run all the services defined in the `docker-compose.yml` file. Run the following command in the root directory of the project:

```bash
docker-compose up --build
```

This command will:

- Build the Docker images for the API service, worker service, and frontend.
- Start the Redis and RabbitMQ services.
- Set the environment variables for each service as defined in the `docker-compose.yml` file.

### 3. Access the Services

- **Frontend Application**: Open your web browser and navigate to `http://localhost:3000` to access the frontend application.
- **API Service**: The API service runs on port `3001`. You can access the API documentation via Swagger at `http://localhost:3001/api-docs`.

### 4. Stopping the Services

To stop the services, press `Ctrl + C` in the terminal where you ran `docker-compose up`. Alternatively, you can run:

```bash
docker-compose down
```

This command will stop and remove all the containers created by `docker-compose up`.

## Swagger Documentation

The API service includes Swagger documentation for easy access to the API endpoints. You can view the documentation by navigating to:

```
http://localhost:3001/api-docs
```

This interface allows you to explore the API, see available endpoints, and test them directly.

## Development

If you need to make changes to the backend or frontend code, you can edit the files in the `./backend/api-service`, `./backend/worker-service`, or `./frontend` directories. The changes will be reflected immediately if you are using Docker volumes as configured in the `docker-compose.yml`.

### Running Without Docker

If you prefer to run the services without Docker, you can do so by navigating to the respective service directories and running:

```bash
pnpm install
pnpm start:dev
```

Make sure to start Redis and RabbitMQ services manually if you choose to run without Docker.

## Conclusion

You now have a fully functional microservices application running locally. For further development, make sure to check the individual service documentation and Swagger API documentation for details on endpoints and usage. If you encounter any issues, feel free to reach out for support.
