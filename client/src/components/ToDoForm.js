import React, { useState, useEffect, useRef } from 'react';

function ToDoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [sort, setSort] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSort = e => {
    setSort(!sort)
    if (sort) {
      props.onSortDate('desc')
    }else{
      props.onSortDate('asc')
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.className=== "todo-button add") {
      props.onAddSubmit({
      text: input
    });

    setInput('');
    }
    if (e.target.className=== "todo-button search") {
      props.onSearchSubmit({
        text: input
      });
      setInput('');
    }
    if (e.target.className=== "todo-button edit") {
      props.submitUpdate({
        text: input
      });
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <div className='buttonContainer'>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button add'>
            Add Todo
          </button>
          <button onClick={handleSubmit} className='todo-button search'>
            Search Todo
          </button>
          <button onClick={handleSort} className='todo-button sort'>
            Sort By Date
          </button>
        </div>
      )}
    </form>
  );
}

export default ToDoForm;