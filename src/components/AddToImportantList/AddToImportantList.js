import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToImportantTodo } from '../../redux/importantTodo'
import { addToTasksTodo } from '../../redux/tasksTodo'
import { addSearchTodo } from '../../redux/search'

function AddToImportantList() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        const date = new Date().getTime()
        dispatch(addSearchTodo({
            name: value,
            group: 'tasks . important',
            completed: false,
            tag: date,
            important: true,
            groupList: 'important',
            display: false
        }))
        dispatch(addToImportantTodo({
            name: value,
            group: 'tasks',
            completed: false,
            tag: date,
            important: true,
            groupList: 'important',
        }))
        dispatch(addToTasksTodo({
            name: value,
            group: 'tasks . important',
            tag: date,
            completed: false,
            groupList: 'important',
            important: true,
        }))
        setValue('')
    }

    return (
        <form 
        onSubmit={onSubmit}
        className="important-add-to-do-form 
        p-0 d-flex flex-row align-items-center"
        >
            <button 
            className="important-add-to-do-submit d-flex 
            justify-content-center align-items-center p-0 position-absolute ms-3" 
            type="submit"
            >
                <svg 
                className="important-add-to-do-plus"
                xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" viewBox="0 0 24 24" 
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            type="text" 
            value={value}
            className="important-add-to-do-list-input py-3"
            placeholder="Add a task" 
            onChange={(event) => setValue(event.target.value)}
            />
            <div className="important-input-after"></div>
        </form>
    )
}

export default AddToImportantList
