import React, { useState, createContext, useContext } from "react";

import "./App.css";
import { useEffect } from "react";
import SearchBox from "./SearchBox";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleList = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("my-todos");
      if (storedTodos) {
        const parsed = JSON.parse(storedTodos);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        } else {
          // Clear corrupted or invalid format
          // localStorage.removeItem('my-todos');
        }
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
      localStorage.removeItem("my-todos");
    }
  }, []);

  // Save todos to localStorage every time they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("my-todos", JSON.stringify(todos));
    }
  }, [todos]); // This runs whenever `todos` changes

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleDone = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };
  
  const removeTodo = () => {
    const newTodos = todos.filter(todo => !todo.done);
    setTodos(newTodos);
  };
  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  };
  // console.log("ff",todos.text)

  return (
    <div className="container">
      <div className="box">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          My Todo App
        </h1>
        <div className="right-item">
          <SearchBox value={todos} setFiltered={setFiltered} />
        </div>
        
        <div className="card">
        {todos.length === 0 && <p>You can add something...</p>}

          {(filtered.length > 0 ? filtered : todos).map((todo, index) => (
            <div className="todo" key={index}>
              <div className="left-item">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(index)}
                />
                <li
                  style={{
                    listStyle: "none",
                    marginLeft: "8px",
                    textDecoration: todo.done ? "line-through" : "none",
                    // width: "auto",
                    display: "flex",
                    minHeight: "40px",
                    wordBreak: "break-word",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  {todo.text}
                </li>
              </div>
              <div className="right-item">
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="box1" style={{ marginTop: "5px" }}>
          <div className="left-item">
            <input
              style={{ marginLeft: "30px", marginBottom: "10px" }}
              type="text"
              value={input}
              onChange={handleList}
              placeholder="type here"
            />
          </div>
          <div
            className="right-item"
            style={{ marginBottom: "13px", marginRight: "30px" }}
          >
            <button onClick={() => addTodo()} className="button">
              Add
            </button>
            <button onClick={(state) => removeTodo(state)} className="button">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
