# ExpensePlus - Mini Expense Tracker

A full-stack expense tracking application built for the Studio Graphene Full Stack Developer Assessment (Exercise 2). It lets a user log daily spending across categories, view and manage all expenses, filter by category and date range, and see a summary of where their money is going. The frontend is built with React + Vite and the backend with Node.js + Express, backed by a SQLite database via Sequelize.

---

## Live Demo

| | URL |
|---|---|
| **Frontend** | https://expense-plus-indol.vercel.app/ |
| **Backend** | https://expenseplus.onrender.com/ |

**Backend cold start:** The API is hosted on Render's free tier which spins down after inactivity. The first request may take **30–60 seconds** to respond — this is expected. Subsequent requests will be fast.

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Vite | Vite's dev server is significantly faster than CRA; Vite's build output is smaller |
| Styling | Tailwind CSS | Utility-first keeps component files clean; no context-switching to separate stylesheets |
| State | React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useOutletContext`) | No external state library needed for this scope; keeps the dependency tree light |
| HTTP client | Axios | Cleaner error handling than raw fetch; easy base URL configuration via `.env` |
| Backend | Node.js + Express | Straightforward REST API setup |
| ORM | Sequelize | Provides model-level validation on top of raw SQL; makes schema changes safer with `alter: true` sync |
| Database | SQLite (via `sqlite3`) | Zero setup, file-based persistence, perfect for a single-user app at this scale |
| Validation | Custom validator + `express-validator` | Wanted to understand the validation layer myself rather than reaching for Zod immediately |

---

## Features Built

**Must Have — all complete**
- Add an expense with amount, category, date, and optional note
- View all expenses sorted by date (newest first)
- Edit and delete existing expenses (delete requires confirmation)
- Filter by category and date range 
- Summary panel — total spent this month, last month and total.

**Should Have — partially complete**
-  Currency formatting using `Intl.NumberFormat` with `en-IN` locale (₹1,234.50)
-  Form validation — no negative amounts, no future dates, category, amount and date are required
-  Loading and error states on all data-fetching operations
-  Empty state UI when no expenses exist
-  Mobile-responsive layout
-  Category chart (pie/bar) — not built; see Next Steps

**Bonus — not built**
-  CSV export
-  Budget per category with visual indicator

---

## How to Run Locally

Assumes you have **Node.js 18+** installed. Nothing else needed.

```bash
# 1. Clone the repo
git clone https://github.com/sukhendu02/ExpensePlus.git
cd expense-tracker

# 2. Install all dependencies (root + server + client)
npm run install:all

# 3. Set up the server environment
cp server/.env.example server/.env

# 4. Start both servers concurrently
Client - npm run dev
Server - npm start
```
## ENV SETUP SUGGESTED
client/.env
VITE_API_URL="http://localhost:3000/api/v1/"

server/.env
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

The SQLite database file is created automatically at `server/data/expenses.sqlite` on first run. No migration step needed.

---

## API Documentation

Base URL: `http://localhost:3000/api/v1`

All success responses follow the shape:
```json
{ "status": "success"}
```

All error responses follow the shape:
```json
{ "sucess": "false",
"error":{
  "code":"",
  "message":"",
  "stack":"",
},
"timestamp":""
}
```

---

### `GET {Base_URL}/expense`

Returns a paginated, filtered, sorted list of expenses.

**Query parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `5` | Results per page  |
| `sortBy` | string | `Created Date` | `expenseDate`, `amount`, `category`, `createdAt` |
| `order` | string | `DESC` | `ASC` or `DESC` |
| `category` | string | — | `Food`, `Transport`, `Bills`, `Fuel`, `Groceries`, `Health`, `Investment`, `EMI`  `Entertainment`,`Shopping`, `Travel`, `Other`, `All` |
| `paymethod` | string | — | `Cash`, `Credit Card`, `Debit Card`, `UPI`, `Other` |
| `search` | string | — | Searches description, category, paymentMethod |
| `startDate` | string | — | `YYYY-MM-DD` |
| `endDate` | string | — | `YYYY-MM-DD` |

**Response:**
```json
{
  "status": "success",
  "data":{
  "data": [
    {
      "id": 1,
      "amount": "250.00",
      "category": "Food",
      "paymentMethod": "UPI",
      "description": "Lunch",
      "expenseDate": "2024-06-01",
      "createdAt": "2024-06-01T10:00:00.000Z",
      "updatedAt": "2024-06-01T10:00:00.000Z"
      
    }
    {
      "id": 2,
      "amount": "290.00",
      "category": "Fuel",
      "paymentMethod": "UPI",
      "description": "Fuel",
      "expenseDate": "2024-06-01",
      "createdAt": "2024-06-01T10:00:00.000Z",
      "updatedAt": "2024-06-01T10:00:00.000Z"
      
    }
    // {and so on..}
  ],
  },
  "total": 42,
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalPage": 9,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### `POST {Base_URL}/expense`

Creates a new expense.

**Request body:**
```json
{
  "amount": 250.00,
  "category": "Food",
  "expenseDate": "2024-06-01",
  "description": "Lunch",
  "paymentMethod": "UPI"
}
```

**Validation rules:**
- `amount` — required, positive number, max 2 decimal places
- `category` — required, must be one of the allowed values
- `expenseDate` — required, valid date, cannot be in the future
- `description` — optional, max 250 characters

**Response:** `201 Created` with the created expense object.

```json
{
    "success": true,
    "message": "Expense added successfully",
    "data": {
        "id": "85f04573-50b3-41d1-a292-916907fccd91",
        "amount": 3500,
        "description": "Online React course",
        "category": "EMI",
        "paymentMethod": "UPI",
        "expenseDate": "2026-03-07",
        "updatedAt": "2026-06-08T15:11:45.372Z",
        "createdAt": "2026-06-08T15:11:45.372Z"
    }
}
```
---

### `PATCH {Base_URL}/expense/:id`

Updates fields that required changes.

**Request body:** same shape as `POST request`

**Response:** `200 OK` with the updated expense object.
**Error:** `404 Not Found` if the expense does not exist.

```json
// EXPAMPLE RESPONSE
{
    "success": true,
    "message": "Expesnse updated successfully",
    "data": {
        "id": "4c47da2b-0a4c-415e-8e34-e1aae8a0fe0c",
        "amount": 200,
        "category": "Food",
        "expenseDate": "2026-02-19",
        "description": "no discription",
        "paymentMethod": "Debit Card",
        "createdAt": "2026-06-05T14:27:28.803Z",
        "updatedAt": "2026-06-08T15:16:24.245Z"
    }
}

```

---

### `DELETE {Base_URL}/expense/:id`

Permanently deletes an expense.

**Response:** `204 No Content`
**Error:** `404 Not Found` if the expense does not exist.


---
### `GET {Base_URL}/stats`

Get stats like:
- All time spends 
- Expense of this month
- Expense of last month

**Response:** `200 OK` stats calculated and returned
```json
{
    "success": true,
    "data": {
        "totalAllTime": 37799,
        "totalThisMonth": 5783,
        "totalLastMonth": 12818
    }
}
```

---



### `GET /health`

Health check — returns `{ "status": "ok","message":"Server is healthy" }`. Used to verify the server is running.

---

## Project Structure

```
expense-tracker/
├── client/                         
│   ├── src/
│   │   ├── api/
│   │   │   ├── expenseApi.js  
|   |   |   └──  stats.api.js
│   │   ├── components/
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseTable.jsx
│   │   │   │   ├── AddExpenseModal.jsx
│   │   │   │   ├── ExpenseFilters.jsx
│   │   │   │   └── ExpensePagination.jsx
|   |   |   |   └── ExpenseSearchBar.jsx
│   │   │   ├── Layout/
│   │   │   |   └── AppLayout.jsx  
│   │   │   └── ui/
│   │   │       ├── EmptyState.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── MobileHeader.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── Spinner.jsx
│   │   │       └── Topbar.jsx
│   │   ├── hooks/
│   │   │   └── useExpenses.js     
│   │   │   └── useStats.js    
|   |   |  
│   │   ├── Pages/
│   │   │   ├──Dashboard.jsx     
│   │   │   └── Expenses.jsx    
|   |   | 
│   │   ├── utils/
│   │   │   ├── expenseConstant.js     
│   │   │   └── formatters.js
|   |   | 
|   |   ├── App.css
|   |   ├── index.css
|   |   ├── main.jsx  
│   │   └── App.jsx
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   └── package.json
│
├── server/                         
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         
│   │   ├── constant/
|   |   |   ├──expenseConstants.js
|   |   |   ├── paymentMethod.js
│   │   │   └── categories.js         
│   │   ├── models/
│   │   │   ├── Expense.js         
│   │   │   └── index.js            
│   │   ├── middleware/
│   │   │   └── ErrorHandler.js            
│   │   ├── modules/
|   |   |   ├── expenses/
|   |   |   |   ├── controller/
|   |   |   |   |   └── expenseController.js
|   |   |   |   ├── route/
|   |   |   |   |   └── expenseRoute.js
|   |   |   |   └── service/
|   |   |   |       └── expenseService.js
|   |   |   └── stats/
|   |   |       ├── controller/
|   |   |       |   └── statsController.js
|   |   |       ├── route/
|   |   |       |   └── statsRoute.js
|   |   |       └── service/
|   |   |           └── statsService.js
│   │   │    
|   │   │   
│   │   ├── utils/
│   │       └── asyncHandler.js        
│   │   
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── package.json        
└── README.md
```

---

## Honesty Notes

**AI tools:** 
- I used Claude during this project, and I want to be transparent about where. Backend architecture ( typed `AppError` classes, the chainable `Validator` utility).
- I can explain every decision there because I wrote and reasoned through it myself. On the frontend, two
specific areas had AI assistance: the **concurrent stats update logic** (keeping the summary panel in sync hen an expense is added/edited/deleted without a full page refetch) and some **Tailwind layout patterns** for the responsive filter panel.
- I used Claude and ChatGPT here to get unblocked, but I read through, understood, and adapted what they suggested — I didn't paste blindly.
- The UI was prototyped using **Stitch by Google** - a great tool for ui design before being implemented in Tailwind.

**What I'd do differently with more time:**
- Add the category chart (Recharts pie chart) — I ran out of time after getting the core CRUD and filters solid. The summary panel has the right aggregated data from the backend; it just needs the chart component wired up on the frontend.
- CSV export — the backend route structure is already set up for it; the controller just needs the CSV streaming logic and a download button on the frontend.
- Budget per category — would add a `budgets` table with a `category` + `monthlyLimit` column, then compare against `categoryTotals` in the summary response.
- More thorough testing.
- Better mobile table experience — currently the table scrolls horizontally on small screens, which works but a card layout per row would feel more native on mobile.

**What works well:**
- The validation layer is something I'm happy with. Instead of reaching for Zod, I built a chainable `Validator` class that collects all field errors before throwing, so the client gets every broken field in one response.
- The error handling architecture (typed `AppError` subclasses + centralised handler) means no `try/catch` blocks in controllers — errors are thrown from services and normalised in one place.

---

## Next Steps

Given more time, in priority order:

1. **Category chart** — Recharts `PieChart` wired to the existing `/summary` endpoint
2. **CSV export** — `GET /api/expenses/export` with streamed CSV response
3. **Budget indicators** — per-category monthly limits with a progress bar in the summary panel
4. **Authentication** — JWT-based login so multiple users can have separate expense histories
5. **React Testing Library** — component-level tests for the form validation and filter behaviour

---

