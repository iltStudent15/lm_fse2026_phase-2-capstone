# Customer Management Application

A full-stack single-page application built with React, TypeScript, and Vite. Users can view, create, edit, and delete customer records via a REST API powered by JSON Server.

## Tech Stack

- **React 18** with TypeScript
- **React Router v7** — client-side routing
- **Context API** — shared application state
- **JSON Server** — local REST API backend
- **Vitest + React Testing Library** — component testing
- **GitHub Pages** — deployment

## Getting Started

All commands are run from inside the `customer-app/` directory:

```bash
cd customer-app
```

### Install dependencies

```bash
npm install
```

### Start the API server

Open a terminal and run:

```bash
npm run api
```

JSON Server will start at `http://localhost:3001`. The following endpoints are available:

| Method | Endpoint                        | Description             |
|--------|---------------------------------|-------------------------|
| GET    | `/customers`                    | Fetch all customers     |
| GET    | `/customers/:id`                | Fetch a single customer |
| POST   | `/customers`                    | Create a new customer   |
| PUT    | `/customers/:id`                | Update a customer       |
| DELETE | `/customers/:id`                | Delete a customer       |

### Start the development server

In a second terminal, run:

```bash
npm run dev
```

Open **`http://localhost:5173/customer-app/`** in your browser.

> The Vite proxy forwards `/api/*` requests to JSON Server, so there are no CORS issues during development.

## Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the Vite development server        |
| `npm run api`   | Start JSON Server on port 3001           |
| `npm run build` | Type-check and build for production      |
| `npm run test`  | Run tests in watch mode                  |
| `npm run test:run` | Run tests once and exit               |
| `npm run lint`  | Lint the codebase with ESLint            |
| `npm run deploy` | Build and deploy to GitHub Pages        |

## Project Structure

```
customer-app/
  src/
    components/    # Reusable UI components (CustomerList, CustomerForm, Layout)
    context/       # CustomerContext — shared state via Context API
    hooks/         # useCustomerApi, useCustomerContext
    pages/         # Route-level components (ListPage, AddPage, EditPage)
    types/         # TypeScript interfaces (Customer, CustomerFormData)
    test/          # Vitest setup
  db.json          # JSON Server database (seed data)
  vite.config.ts   # Vite + Vitest configuration
```

## Running Tests

```bash
npm run test:run
```

## Deployment

The app is deployed to GitHub Pages at:  
**`https://iltStudent15.github.io/lm_fse2026_phase-2-capstone`**

To redeploy:

```bash
npm run deploy
```
