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
        return <ToDoForm edit={edit} submitUpdate={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}
        >
            <div key={todo._id}>
                {todo.text}
                {"  "}
                {betterDate(todo.date)}
            </div>
            <div className='actionButtons'>
                <div onClick={() => removeToDo(todo._id)} className='delete-button'>
                    Delete
                </div>
                <div onClick={() => setEdit({ id: todo._id, value: todo.text })} className='edit-button'>
                    Edit
                </div>
            </div>
        </div>
    ));
};

export default ToDo;