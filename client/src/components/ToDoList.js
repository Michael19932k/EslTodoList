import React, { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';
import ToDo from './ToDo';

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getInit = async () => {
      const initTodos = await await fetch("http://localhost:4000/getInit");
      setTodos(initTodos)
    }
    getInit()
  }, [])


  const addToDo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    console.log(...todos);

    fetch("/addTodo", {
      method: 'POST',
      body: JSON.stringify({ todo }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));
  }


  const updateToDo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    console.log(newValue)
    fetch("/editTodo", {
      method: 'POST',
      body: JSON.stringify({ todoId, newValue }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeToDo = id => {

    fetch("/removeTodo", {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        setTodos(res)
      })
      .catch(error => console.error('Error:', error));


  };

  const completeToDo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        console.log(todo.isComplete)
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <ToDoForm onSubmit={addToDo} />
      <ToDo
        todos={todos}
        completeToDo={completeToDo}
        removeToDo={removeToDo}
        updateToDo={updateToDo}
      />
    </>
  );
}

export default ToDoList;