# Full Stack Task Management Web Application

A complete, modern, full-stack Task Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). This application features a premium dark-mode UI, JWT authentication, task filtering, statistics, and responsive design.

## Features

- **Authentication System**: Secure JWT-based Login and Registration.
- **Dashboard**: View all tasks in a responsive card layout.
- **Task Management**: Create, Read, Update (status), and Delete tasks.
- **Statistics**: Visual overview of total, pending, in progress, and completed tasks.
- **Filtering & Search**: Quickly find tasks by status or title search.
- **Pagination**: Handle large volumes of tasks gracefully.
- **Dark Mode**: Built-in dark mode toggle using Tailwind CSS.
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices.

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & bcryptjs
- **Testing**: Jest & Supertest

## Folder Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React Context (Auth, Theme)
│   │   ├── pages/       # Route-level components
│   │   ├── services/    # API integrations (Axios)
│   │   ├── __tests__/   # Frontend tests
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── __tests__/       # Backend tests
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB running locally (or provide an Atlas URI)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start typically on `http://localhost:5173`.

## API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token
- `GET /api/auth/profile` - Get logged-in user profile (Protected)

### Task Routes (All Protected)
- `GET /api/tasks` - Get all tasks (supports query params: `status`, `search`, `page`, `limit`, `sort`)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get dashboard statistics

## Code Quality
- **Clean Architecture**: Follows MVC pattern on the backend.
- **Reusable Components**: Modular React frontend components.
- **ES6+ Syntax**: Uses modern JavaScript features (Async/Await, destructuring, etc.).
- **Error Handling**: Comprehensive try/catch blocks with meaningful API responses.
