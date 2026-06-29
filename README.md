# User Management Dashboard

A fully-featured, responsive User Management Dashboard built with **React.js + JavaScript**, styled with **Tailwind CSS v4**, and powered by the **JSONPlaceholder** mock REST API.

---

## 📋 Project Overview

This application allows administrators to perform full **CRUD (Create, Read, Update, Delete)** operations on user data. It connects to the JSONPlaceholder free REST API (`https://jsonplaceholder.typicode.com/users`) for simulated backend interactions.

### Core Capabilities
- **View** all users in a structured, sortable table
- **Search** users in real-time across multiple fields
- **Filter** users via a multi-criteria popup panel
- **Sort** columns bidirectionally (A→Z / Z→A)
- **Add** new users via a validated modal form
- **Edit** existing users with pre-populated fields
- **Delete** users with a safety confirmation step
- **Paginate** results with configurable page sizes (10 / 25 / 50 / 100)
- **Validate** all form inputs client-side with inline error messages
- **Handle** API errors gracefully with visual feedback

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm (bundled with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd user-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port).

---

## 🖥️ Running the Project

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build the production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |

---

## 📁 Folder Structure

```
user-management/
│
├── public/
│    ├── favicon.svg
│    └── icons.svg
│
├── src/
│    ├── api/
│    │    └── userService.js        # Axios instance + GET/POST/PUT/DELETE methods
│    │
│    ├── components/
│    │    ├── Navbar.jsx            # Fixed top navigation bar
│    │    ├── Footer.jsx            # Page footer
│    │    ├── Header.jsx            # Page title, breadcrumb, Add User CTA
│    │    ├── SearchBar.jsx         # Real-time search input
│    │    ├── FilterPopup.jsx       # Multi-field filter modal
│    │    ├── UserTable.jsx         # Sortable table with skeleton loaders
│    │    ├── UserRow.jsx           # Individual table row with actions
│    │    ├── UserForm.jsx          # Add / Edit modal form
│    │    ├── ConfirmDelete.jsx     # Delete confirmation modal
│    │    └── Pagination.jsx        # Page controls with ellipsis
│    │
│    ├── hooks/
│    │    └── useUsers.js           # Custom hook: fetch, add, edit, remove
│    │
│    ├── utils/
│    │    ├── validators.js         # Client-side form validation with RegEx
│    │    ├── constants.js          # API_URL, PAGE_SIZE_OPTIONS, DEPARTMENTS
│    │    └── helpers.js            # mapApiUserToUser, paginateArray, getTotalPages
│    │
│    ├── styles/
│    │    └── global.css            # Additional global styles (unused — merged into index.css)
│    │
│    ├── index.css                  # Tailwind import + custom animations & utilities
│    ├── App.jsx                    # Root component — shared state, layout orchestration
│    └── main.jsx                   # React DOM entry point
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite + Tailwind CSS v4 plugin config
├── eslint.config.js                # ESLint for JS/JSX
└── README.md                       # This file
```

---

## 📦 Libraries Used

| Library | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI component framework |
| **Vite** | 8.x | Lightning-fast build tool & dev server |
| **Axios** | latest | HTTP client for REST API communication |
| **Tailwind CSS v4** | 4.x | Utility-first CSS framework (via `@tailwindcss/vite`) |
| **Inter (Google Fonts)** | — | Modern sans-serif typography |

---

## 🔌 Backend API

**Base URL:** `https://jsonplaceholder.typicode.com/users`

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/users` | Fetch all 10 users |
| `POST` | `/users` | Simulate creating a new user |
| `PUT` | `/users/:id` | Simulate updating a user |
| `DELETE` | `/users/:id` | Simulate deleting a user |

> **Note:** JSONPlaceholder is a **read-only** mock API. POST/PUT/DELETE requests return valid HTTP responses (201/200/200) but **do not persist** changes on the server. All mutations are reflected in **local React state** only.

---

## ⚙️ Engineering Assumptions

### 1. Name Field Splitting
The JSONPlaceholder API returns a single `name` string (e.g., `"Leanne Graham"`). This application splits it on the **first space** to derive:
- `firstName` → `"Leanne"`
- `lastName` → `"Graham"` (everything after the first space, preserving multi-word last names)

**Mapping logic** (`src/utils/helpers.js`):
```js
const nameParts = String(apiUser.name).trim().split(' ');
const firstName = nameParts[0] || '';
const lastName  = nameParts.slice(1).join(' ') || '';
```

### 2. Department Assignment
JSONPlaceholder has no `department` field. This application maps `company.name` (e.g., `"Romaguera-Crona"`) as the department value. If unavailable, it falls back to rotating through the `DEPARTMENTS` constant array (`Engineering`, `Marketing`, `Sales`, etc.).

### 3. Simulated POST IDs
JSONPlaceholder always returns `id: 11` for every POST response. This app overrides that with `Date.now()` to guarantee unique local IDs for newly created users.

### 4. No Server Persistence
All CRUD operations are **optimistically reflected in local React state** only. Refreshing the page resets the list to the original 10 users from the API.

---

## 🧩 Feature Implementation Details

### Search
- Real-time filtering across `firstName`, `lastName`, `email`, and `department`
- Input debounce is not applied — results update on each keystroke

### Filter Popup
- Supports independent filtering by `firstName`, `lastName`, `email`, and `department`
- Filters are applied only on **"Apply"** click, not live
- Active filter count badge displayed on the Filters button

### Sorting
- All 5 columns sortable: `id`, `firstName`, `lastName`, `email`, `department`
- Lexicographical comparison via `localeCompare` for string fields
- Toggle between ascending ↑ and descending ↓ on repeated clicks

### Pagination
- Page sizes: **10 / 25 / 50 / 100** records per page
- Smart ellipsis (`…`) for large page counts
- Resets to page 1 whenever search, filter, sort, or page size changes

### Form Validation
All fields validated before API call:
- `firstName` / `lastName`: required, min 2 characters
- `email`: required, must match `/^\S+@\S+\.\S+$/`
- `department`: required (must select from dropdown)
- Inline error messages shown per field on failed submission

### Error Handling
- All API calls wrapped in `try/catch` blocks
- Global error banner shown if the initial `GET /users` fails
- Form-level error messages shown if `POST` / `PUT` / `DELETE` fails
- Axios response interceptor normalises all error messages to a human-readable string

---

## ⚡ Challenges & How They Were Overcome

| Challenge | Solution |
|---|---|
| JSONPlaceholder has no `firstName`, `lastName`, or `department` fields | Programmatic mapping in `helpers.js` — split `name` on first space, use `company.name` as department |
| `POST` always returns `id: 11` | Override with `Date.now()` for a unique local ID |
| Tailwind CSS v4 has no `tailwind.config.js` | Used `@tailwindcss/vite` plugin and `@import "tailwindcss"` in CSS |
| TypeScript → JavaScript migration mid-project | Systematically converted all `.ts`/`.tsx` files, removed type annotations, kept JSDoc |
| No server persistence | Optimistic local state updates after every CRUD operation |

---

## 🔮 Future Improvements

1. **Real Backend** — Replace JSONPlaceholder with a real REST API (Node.js + Express + MongoDB) for actual data persistence
2. **Authentication** — Add JWT-based login/logout with role-based access control (admin vs. viewer)
3. **React Router** — Multi-page routing with URL-based deep linking (e.g., `/users/:id`)
4. **Infinite Scroll** — Alternative to pagination for large datasets
5. **Export** — CSV / Excel export of the current filtered/sorted view
6. **Dark/Light Mode Toggle** — User-selectable theme preference stored in `localStorage`
7. **Unit Tests** — Jest + React Testing Library tests for validators, helpers, and key components
8. **Debounced Search** — Reduce re-renders on fast typing with a 300ms debounce on the search input

---

## 📝 Submission Checklist

- [x] GitHub Repository with complete source code
- [x] Deployed live URL
- [x] Screen recording walkthrough (3–5 min)
