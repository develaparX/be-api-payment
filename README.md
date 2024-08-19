### Documentation for Running the Program with Docker

#### 1. **Editing the `.env` File Based on `.env.example`**

Before running the application, you need to configure the `.env` files for both the `account-manager` and `payment-manager` services. These files contain essential environment variables required by each service.

- **Step 1: Copy `.env.example` to `.env`**

  In the root directory of both services, copy the `.env.example` file to create a new `.env` file:

  ```bash
  cp account-manager/.env.example account-manager/.env
  cp payment-manager/.env.example payment-manager/.env
  ```

- **Step 2: Edit the `.env` File**

  Open the `.env` files in both `account-manager` and `payment-manager` directories and update them with the correct values:

  - **For `account-manager/.env`:**

    ```env
    DATABASE_URL=postgresql://<user>:<password>@db:5432/account_db
    SUPABASE_URL=https://your-supabase-url
    SUPABASE_KEY=your-supabase-key
    INTERNAL_API_KEY=your-internal-api-key
    ```

  - **For `payment-manager/.env`:**
    ```env
    ACCOUNT_MANAGER_URL=http://account-manager:3000
    DATABASE_URL=postgresql://<user>:<password>@db_payment:5432/payment_db
    SUPABASE_URL=https://your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    INTERNAL_API_KEY=your-internal-api-key
    ```

  Make sure to replace `<user>`, `<password>`, and other placeholder values with your actual configurations.

#### 2. **Editing `docker-compose.yml`**

Ensure your `docker-compose.yml` file is correctly set up to build and run the services:

- **Docker Compose Configuration:**

  ```yaml
  version: '3.8'

  services:
    account-manager:
      build:
        context: ./account-manager
        dockerfile: Dockerfile
      ports:
        - '3000:3000'
      environment:
        - DATABASE_URL=postgresql://<user>:<password>@db:5432/account_db
        - SUPABASE_URL=${SUPABASE_URL}
        - SUPABASE_KEY=${SUPABASE_KEY}
        - INTERNAL_API_KEY=${INTERNAL_API_KEY}
      depends_on:
        - db

    payment-manager:
      build:
        context: ./payment-manager
        dockerfile: Dockerfile
      ports:
        - '3001:3001'
      environment:
        - ACCOUNT_MANAGER_URL=http://account-manager:3000
        - DATABASE_URL=postgresql://<user>:<password>@db_payment:5432/payment_db
        - SUPABASE_URL=${SUPABASE_URL}
        - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
        - INTERNAL_API_KEY=${INTERNAL_API_KEY}
      depends_on:
        - db_payment

    db:
      image: postgres:15
      environment:
        POSTGRES_USER: <user>
        POSTGRES_PASSWORD: <password>
        POSTGRES_DB: account_db
      volumes:
        - pgdata:/var/lib/postgresql/data

    db_payment:
      image: postgres:15
      environment:
        POSTGRES_USER: <user>
        POSTGRES_PASSWORD: <password>
        POSTGRES_DB: payment_db
      volumes:
        - pgdata_payment:/var/lib/postgresql/data

  volumes:
    pgdata:
    pgdata_payment:
  ```

  Update `<user>` and `<password>` with your actual PostgreSQL credentials.

#### 3. **Building and Running the Application**

Once your `.env` files and `docker-compose.yml` are correctly configured, follow these steps to build and run the application:

- **Step 1: Build the Docker Images**

  Navigate to the root directory where your `docker-compose.yml` file is located and run the following command to build the Docker images:

  ```bash
  docker-compose build
  ```

- **Step 2: Run the Containers**

  After building the images, start the containers with:

  ```bash
  docker-compose up
  ```

  This command will start all services (`account-manager`, `payment-manager`, `db`, and `db_payment`) in detached mode.

- **Step 3: Access the Services**

  Once the containers are up and running:

  - The `account-manager` service will be accessible at `http://localhost:3000`.
  - The `payment-manager` service will be accessible at `http://localhost:3001`.

#### 4. **Stopping the Application**

To stop the application and remove the containers, use the following command:

```bash
docker-compose down
```

This command stops all running services and removes the associated containers.

---

By following these steps, you will be able to set up and run your `account-manager` and `payment-manager` services using Docker with PostgreSQL databases.

#### 4. **API Documentation**

For API Documentation to ALL Endpoint please check **api.readme.md** file.

Thank You!
