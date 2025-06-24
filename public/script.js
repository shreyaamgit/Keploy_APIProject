const API_URL = "/api/todos";

// DOM elements
const todoForm = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const todosContainer = document.getElementById("todos");

// Function to fetch and display todos
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function renderTodos() {
  const todos = await fetchTodos();
  todosContainer.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.className = `todo ${todo.completed ? "completed" : ""}`;
    todoElement.innerHTML = `
      <input 
        type="checkbox" 
        ${todo.completed ? "checked" : ""}
        data-id="${todo.id}"
        class="toggle"
      >
      <span>${todo.title}</span>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;
    todosContainer.appendChild(todoElement);
  });

  // Add event listeners
  document.querySelectorAll(".toggle").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-id");
      toggleTodo(id, e.target.checked);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      deleteTodo(id);
    });
  });
}

async function createTodo(title) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error("Failed to create todo");
    await renderTodos();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function toggleTodo(id, completed) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) throw new Error("Failed to update todo");
    await renderTodos();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete todo");
    await renderTodos();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Event listeners
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (title) {
    createTodo(title);
    titleInput.value = "";
  }
});

// Initial render
renderTodos();
