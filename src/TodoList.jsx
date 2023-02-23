import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!inputValue) return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  }

  function handleToggle(index) {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Add Todo' value={inputValue} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggle(index)}
            />

            <span style={{margin: '0 5px'}}/>

            <input type="text" style={{ textDecoration: todo.completed ? 'line-through' : 'none'}} disabled value={todo.text} />

            <span style={{margin: '0 5px'}}/>

            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
