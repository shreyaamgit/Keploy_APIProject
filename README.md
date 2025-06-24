# Keploy Todo API Project

This project is a simple Todo application featuring a RESTful API server built with Node.js, Express, and SQLite, along with an interactive frontend. It allows users to create, read, update, and delete todos through API endpoints or a web interface.

---

## Table of Contents

- [API Endpoints and Functionality](#api-endpoints-and-functionality)
- [Database Used and Integration](#database-used-and-integration)
- [How to Run the Server](#how-to-run-the-server)
- [How to Run the Frontend Locally](#how-to-run-the-frontend-locally)
- [How to Interact with the API](#how-to-interact-with-the-api)
- [Sample Requests and Responses](#sample-requests-and-responses)
- [Project Structure](#project-structure)
- [Notes](#notes)

---

## API Endpoints and Functionality

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/todos`     | Retrieve all todos       |
| POST   | `/api/todos`     | Add a new todo           |
| PUT    | `/api/todos/:id` | Update a todo by ID      |
| DELETE | `/api/todos/:id` | Delete a todo by ID      |

- **GET /api/todos**: Returns a list of all todos.
- **POST /api/todos**: Creates a new todo. Expects a JSON body with a `title` field.
- **PUT /api/todos/:id**: Updates the `title` and/or `completed` status of a todo by ID.
- **DELETE /api/todos/:id**: Deletes the specified todo.

---

## Database Used and Integration

- **Database:** SQLite (in-memory for CodeSandbox, file-based if run locally)
- **Integration:**  
  The backend uses the `sqlite3` Node.js package. On server start, it creates a `todos` table if it doesn't exist. All CRUD operations are performed via SQL queries in the Express endpoints. No manual database setup is required—everything is handled automatically when you run the server.

---

## How to Run the Server

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/keploy-api-project.git
   cd keploy-api-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the server:**
   ```
   npm start
   ```
   The server will start on [http://localhost:3000](http://localhost:3000) by default.

---

## How to Run the Frontend Locally (Optional)

- The frontend is served automatically by Express from the `/public` directory.
- After starting the server, open your browser and go to:
  ```
  http://localhost:3000
  ```
- You will see a simple web app where you can add, complete, and delete todos interactively.

---

## How to Interact with the API

You can interact with the API using:
- The provided frontend web app
- Tools like **curl** or **Postman**

---

## Sample Requests and Responses

### Create a Todo

**Request:**
```
curl -X POST -H "Content-Type: application/json" -d '{"title":"Learn Keploy"}' http://localhost:3000/api/todos
```
**Response:**
```
{
  "id": 1,
  "title": "Learn Keploy",
  "completed": 0
}
```

---

### Get All Todos

**Request:**
```
curl http://localhost:3000/api/todos
```
**Response:**
```
[
  { "id": 1, "title": "Learn Keploy", "completed": 0 }
]
```

---

### Update a Todo

**Request:**
```
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' http://localhost:3000/api/todos/1
```
**Response:**
```
{ "message": "Todo updated", "changes": 1 }
```

---

### Delete a Todo

**Request:**
```
curl -X DELETE http://localhost:3000/api/todos/1
```
**Response:**
```
{ "message": "Todo deleted", "changes": 1 }
```

---

## Project Structure

```
keploy-api-project/
├── public/
│   ├── index.html
│   └── script.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

---

## Notes

- The SQLite database is in-memory by default in CodeSandbox, so data will reset on server restart. For persistent storage locally, you can change the database initialization in `server.js` to use a file (e.g., `new sqlite3.Database('./todos.db')`).
- No external database setup is required.

---

If you have any questions or issues, please open an issue or contact the maintainer.
```
