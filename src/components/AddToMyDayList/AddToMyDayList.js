import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToMyDayTodo } from '../../redux/myDayTodo'
import { addToTasksTodo } from '../../redux/tasksTodo'
import { addSearchTodo } from '../../redux/search'

export default function AddToMyDayList() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        const date = new Date().getTime()
        dispatch(addSearchTodo({
            name: value,
            group: 'tasks . my day',
            completed: false,
            tag: date,
            important: false,
            groupList: 'my day',
            display: false
        }))
        dispatch(addToMyDayTodo({
            name: value,
            group: 'tasks',
            completed: false,
            tag: date,
            important: false
        }))
        dispatch(addToTasksTodo({
            name: value,
            group: 'tasks . my day',
            tag: date,
            completed: false,
            groupList: 'my day',
            important: false
        }))
        setValue('')
    }

    return (
        <form 
        onSubmit={onSubmit}
        className="my-day-add-to-do-form 
        p-0 d-flex flex-row align-items-center"
        >
            <button 
            className="my-day-add-to-do-submit d-flex 
            justify-content-center align-items-center p-0 position-absolute ms-3" 
            type="submit"
            >
                <svg 
                className="my-day-add-to-do-plus"
                xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" viewBox="0 0 24 24" 
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            type="text" 
            className="my-day-add-to-do-list-input py-3"
            placeholder="Add a task" 
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <div className="input-after"></div>
        </form>
    )
}
