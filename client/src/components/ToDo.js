import React, { useState } from 'react';
import ToDoForm from './ToDoForm';



const ToDo = ({ todos, completeToDo, removeToDo, updateToDo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const betterDate = dateStr => {
        var date = new Date(dateStr);  // dateStr you get from mongodb

        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return `${d+`/`+m+`/`+y}`
    }


    const submitUpdate = value => {
        updateToDo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (

        <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}
        >
            <div key={todo.id} onClick={() => completeToDo(todo.id)}>
                {todo.text}
                {"  "}
                {betterDate(todo.date)}
            </div>
            <div className='icons'>
                <div onClick={() => removeToDo(todo.id)} className='delete-icon'>
                    Delete
                </div>
                <div onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit-icon'>
                    Edit
                </div>
            </div>
        </div>
    ));
};

export default ToDo;