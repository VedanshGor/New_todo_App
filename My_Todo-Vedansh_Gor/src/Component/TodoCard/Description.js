import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const handleDescriptionChange = (e) => {
    handleDescriptionChan(e.target.value);
  };

  return (
    <form onSubmit={Description}>
      <input
        type="text"
        value={Description}
        onChange={handleDescriptionChange}
      />
      <button>Description please</button>
    </form>
  );
}

function TodoList({ todos, deleteTodo }) {
  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <div>
            <span>{todo.description}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Description() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text, description) => {
    const newTodo = { id: Date.now(), text, description };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Description;
