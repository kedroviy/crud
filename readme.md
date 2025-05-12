# CRUD Application with Node.js & Clustering

This project is a simple **CRUD application** built with **Node.js**, **TypeScript**, and **Webpack**. It supports horizontal scaling via clustering, using Node.js Cluster API. The application can run multiple instances of the server on different ports, and a load balancer will distribute requests across them.

## Features

- **Clustering**: Run multiple instances of your application to utilize all CPU cores.
- **Development Mode**: Quickly develop with hot-reloading.
- **Production Mode**: Build the application and serve it for production.

Before you begin, make sure you have the following installed:

- **Node.js** (22.14.0 or upper)
- **npm** (v7.x or above)
- **TypeScript** (installed globally)

## Available Scripts

### start:dev

Runs the application in development mode with hot-reloading using ts-node-dev.

```npm run start:dev```

### start:multi

Starts multiple instances of the application using Node.js clustering. Each worker will run on a different port, and a load balancer will distribute requests to them.

```npm run start:multi```

### start:prod

Runs the production version of the app. This will first build the app and then start it.

```npm run start:prod```

