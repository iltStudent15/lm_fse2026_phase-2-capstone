# Architecture: Customer Management Application

## Component Tree

```
App
  BrowserRouter
    Routes
      Route "/" → Layout (shell with header + nav)
        Route index → ListPage
          CustomerList         (Day 2)
            CustomerRow × N
        Route "/add" → AddPage
          CustomerForm (add mode)
        Route "/edit/:id" → EditPage
          CustomerForm (edit mode, pre-filled)
```

## Architecture Decisions

### 1. Where will customer state live?
**Decision: CustomerContext wrapping the app (Option B — useReducer + Context)**

Customer data needs to be accessible from three separate pages (List, Add, Edit) with no
direct parent-child relationship between them. Lifting state to App and threading it through
Layout into each page would create prop-drilling. A Context provider at the App level gives
every page direct access via `useCustomerContext()`.

### 2. How will CRUD operations be managed?
**Decision: useReducer with typed action creators**

Actions: `SET_CUSTOMERS | ADD_CUSTOMER | UPDATE_CUSTOMER | DELETE_CUSTOMER`

`useReducer` makes state transitions explicit and predictable. Each action is a plain object
with a discriminated union type, so TypeScript catches any mismatched payloads at compile time.

### 3. What custom hooks are needed?
- **`useCustomerApi`** — wraps all `fetch` calls to `/api/customers`, tracks `loading` and `error`
  state, and re-fetches after every mutation.
- **`useCustomerContext`** — thin wrapper around `useContext(CustomerContext)` that throws if
  called outside the provider (fail-fast pattern).

### 4. How will the form handle add vs. edit mode?
**Decision: Single `CustomerForm` component with an optional `initialData` prop**

- When `initialData` is `undefined` → add mode (empty fields, "Add Customer" button)
- When `initialData` is provided → edit mode (pre-filled fields, "Update Customer" button)

This avoids duplicating form logic and is easy to test in isolation by controlling the prop.

## Data Model

```typescript
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

type CustomerFormData = Omit<Customer, 'id'>;
```

## API Layer

JSON Server runs on port 3001. Vite proxies `/api/*` → `http://localhost:3001/*` to avoid CORS.
All fetch calls use `/api/customers` as the base path.

| Method | URL | Purpose |
|--------|-----|---------|
| GET | /api/customers | Fetch all |
| GET | /api/customers/:id | Fetch one |
| POST | /api/customers | Create |
| PUT | /api/customers/:id | Replace |
| DELETE | /api/customers/:id | Delete |
