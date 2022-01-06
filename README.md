# Express and SQL Server Example

Tiny REST API server implemented using ExpressJS and Prisma Client that connects to a SQL Server database.

The purpose of this example is to try Azure App Service Hybrid Connections. Thus the ExpressJS server and the SQL server should be deployed on Azure App Service and on-prem, respectively.

## Prerequisites

You must have a SQL server up and running.

## Getting started

1. Download the repo and install all dependencies:
    ```bash
    git clone https://github.com/francescobarbarulo/expressjs-sqlserver-app.git
    cd expressjs-sqlserver-app
    npm install
    ```

2. Create the `.env` file with the following database connection string:
    ```bash
    DATABASE_URL="sqlserver://<hostname>:1433;database=<db>;user=sa;password=<passwd>;trustServerCertificate=true"
    ```

3. Create and seed the database:
    ```bash
    npx prisma migrate dev --name init
    ```

4. Test locally the REST API server:
    ```
    npm run start
    ```
    The server starts by default on port `3000`, but you can chenge it by adding a `PORT` attribute in the `.env` file:
    ```
    PORT=8080
    ```

## Deploy on Azure App Service and Hybrid Connections

1. Deploy the app on Azure App Service. A Node.js web app con be easily deployed on the App Service by following the [offical Microsoft documentation](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode).

2. From the Azure portal, set the `DATABASE_URL` parameter (the same of the `.env` file) in application settings tab under the "Configuration" tab of the App Service.

    **NOTE**: I was able to deploy successfully only on **linux** App Service.

3. Create and add an Hybrid Connection the app by following again the [official Microsoft documentation](https://docs.microsoft.com/en-us/azure/app-service/app-service-hybrid-connections#add-and-create-hybrid-connections-in-your-app).

    **NOTE**: If the status of the connection in the HCM stays "Not Connected" even after following all steps correctly, try to restart the Azure Hybrid Connection Manger Service from the Windows Services Manager.