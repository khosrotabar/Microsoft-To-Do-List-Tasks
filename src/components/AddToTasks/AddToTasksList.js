import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToTasksTodo } from '../../redux/tasksTodo'
import { addSearchTodo } from '../../redux/search'

export default function AddToTasksList() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        const date = new Date().getTime()
        dispatch(addSearchTodo({
            name: value,
            group: 'tasks . tasks',
            completed: false,
            tag: date,
            important: false,
            groupList: 'tasks',
            display: false
        }))
        dispatch(addToTasksTodo({
            name: value,
            group: 'tasks',
            completed: false,
            tag: date,
            groupList: 'tasks',
            important: false
        }))
        setValue('')
    }

    return (
        <form 
        onSubmit={onSubmit}
        className="tasks-add-to-do-form 
        p-0 d-flex flex-row align-items-center"
        >
            <button 
            className="tasks-add-to-do-submit d-flex 
            justify-content-center align-items-center p-0 position-absolute ms-3" 
            type="submit"
            >
                <svg 
                className="tasks-add-to-do-plus"
                xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" viewBox="0 0 24 24" 
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            type="text" 
            className="tasks-add-to-do-list-input py-3"
            placeholder="Add a task" 
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <div className="tasks-input-after"></div>
        </form>
    )
}
