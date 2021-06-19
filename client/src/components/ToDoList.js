import React, { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';
import ToDo from './ToDo';

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getInit")
      .then(res => res.json())
      .then(res => {
        setTodos(res)
      })
  }, [])

  const addToDo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    fetch("/addTodo", {
      method: 'POST',
      body: JSON.stringify({ todo }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));
  }

  const searchOneToDo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    fetch("/searchOne", {
      method: 'POST',
      body: JSON.stringify({ todo }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos([res])
      })
      .catch(error => console.error('Error:', error));
  }
  const sortDate = sort => {
    fetch("/sortDate", {
      method: 'POST',
      body: JSON.stringify({ sort }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));
  }


  const updateToDo = (_id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    fetch("/editTodo", {
      method: 'POST',
      body: JSON.stringify({ _id, newValue }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));

    setTodos(prev => prev.map(item => (item._id === todos._id ? newValue : item)));
  };

  const removeToDo = _id => {

    fetch("/removeTodo", {
      method: 'POST',
      body: JSON.stringify({ _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));
  };


  return (
    <>
      <h1>Your to do list</h1>
      <ToDoForm
        onAddSubmit={addToDo}
        onSearchSubmit={searchOneToDo}
        onSortDate={sortDate}
      />
      <ToDo
        todos={todos}
        removeToDo={removeToDo}
        updateToDo={updateToDo}
      />
    </>
  );
}

export default ToDoList;