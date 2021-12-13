import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToPlannedTodo } from '../../redux/plannedTodo'
import { addToTasksTodo } from '../../redux/tasksTodo'
import { addSearchTodo } from '../../redux/search'

function AddToPlanned() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        const date = new Date().getTime()
        dispatch(addSearchTodo({
            name: value,
            group: 'tasks . planned . today',
            completed: false,
            tag: date,
            important: false,
            groupList: 'planned',
            display: false
        }))
        dispatch(addToPlannedTodo({
            name: value,
            group: 'tasks',
            completed: false,
            tag: date,
            groupList: 'today',
            important: false
        }))
        dispatch(addToTasksTodo({
            name: value,
            group: 'tasks . today',
            tag: date,
            completed: false,
            groupList: 'planned',
            important: false
        }))
        setValue('')
    }

    return (
        <form 
        onSubmit={onSubmit}
        className="planned-add-to-do-form 
        p-0 d-flex flex-row align-items-center"
        >
            <button 
            className="planned-add-to-do-submit d-flex 
            justify-content-center align-items-center p-0 position-absolute ms-3" 
            type="submit"
            >
                <svg 
                className="planned-add-to-do-plus"
                xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" viewBox="0 0 24 24" 
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            type="text" 
            className="planned-add-to-do-list-input py-3"
            placeholder="Add a task" 
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <div className="planned-input-after"></div>
        </form>
    )
}

export default AddToPlanned
