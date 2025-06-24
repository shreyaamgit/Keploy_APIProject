const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Create in-memory SQLite database
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error("Database error:", err.message);
    return;
  }
  console.log("Connected to in-memory SQLite database");

  // Create todos table
  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )`,
    (err) => {
      if (err) {
        console.error("Table creation error:", err.message);
      } else {
        console.log("Todos table created");
        // Add sample data
        db.run(
          "INSERT INTO todos (title) VALUES ('Learn Keploy'), ('Build API')"
        );
      }
    }
  );
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API Endpoints
// Create todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  db.run("INSERT INTO todos (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      title,
      completed: 0,
    });
  });
});

// Get all todos
app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  let query = "UPDATE todos SET ";
  const params = [];
  const updates = [];

  if (title !== undefined) {
    updates.push("title = ?");
    params.push(title);
  }

  if (completed !== undefined) {
    updates.push("completed = ?");
    params.push(completed ? 1 : 0);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  query += updates.join(", ") + " WHERE id = ?";
  params.push(id);

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Todo updated", changes: this.changes });
  });
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Todo deleted", changes: this.changes });
  });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Preview: https://${process.env.CODESANDBOX_HOST}`);
});
