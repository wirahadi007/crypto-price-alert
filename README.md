# Project Setup and Running Instructions

This document provides instructions for setting up and running the project.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Node.js](https://nodejs.org/) installed on your machine (for local development, if needed).
- [PostgreSQL](https://www.postgresql.org/download/) installed (if you are not using Docker for the database).

## Project Structure

```
.
├── docker-compose.yml
├── .env
├── src
│   ├── email
│   ├── moralis
│   ├── price
│   └── app.module.ts
└── package.json
```

## Configuration

1. **Create a `.env` file** in the root of your project with the following environment variables:

```plaintext
KEY_MAILGUN=your_mailgun_key
TO_MAIL='hyperhire_assignment@hyperhire.in'
MORALIS_APIKEY='your_moralis_api_key'

# Email Configuration
EMAIL_USER='your_email@gmail.com'
EMAIL_PASSWORD='your_email_password'
EMAIL_PORT=587
EMAIL_HOST='your_host'

# Database Configuration
DB_HOST='db'  # This should match the service name in docker-compose
DB_PORT=5432
DB_PASSWORD='your_db_password'
DB_USERNAME='your_db_username'
```

2. **Modify the values** as necessary, particularly the API keys and database credentials.

## Running the Project

### Using Docker

1. Navigate to your project directory.

   ```bash
   cd /path/to/your/project
   ```

2. Build and start the services using Docker Compose.

   ```bash
   docker-compose up --build
   ```

3. Your application should now be running at [http://localhost:3000](http://localhost:3000).

### Accessing the Database

You can access the PostgreSQL database using any PostgreSQL client with the following connection settings:

- **Host**: localhost
- **Port**: 5432
- **User**: your_db_username
- **Password**: your_db_password
- **Database**: mydb

## Stopping the Project

To stop the running services, use the following command:

```bash
docker-compose down
```

### Accessing the api documentation

You can access api documentation with the following this step:

- Run this project
- access the api at [http://localhost:3000/price/api]

and you can see the swagger UI

## Notes

- Ensure that your Mailgun account is activated and set up correctly to send emails.
- If using Gmail, make sure to enable "Less secure app access" in your Google account settings if you encounter authentication issues.
