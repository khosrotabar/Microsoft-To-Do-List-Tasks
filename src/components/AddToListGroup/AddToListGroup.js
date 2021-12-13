import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToListGroupTodo } from '../../redux/listGroup'
import { addSearchTodo } from '../../redux/search'

function AddToListGroup(props) {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        const date = new Date().getTime()
        dispatch(addSearchTodo({
            name: value,
            group: 'other lists',
            completed: false,
            tag: date,
            important: false,
            groupList: props.groupName,
            display: false
        }))
        dispatch(addToListGroupTodo({
            name: value,
            completed: false,
            groupList: props.groupName,
            important: false,
            tag: date
        }))
        setValue('')
    }

    return (
        <form 
        onSubmit={onSubmit}
        className="list-group-add-to-do-form 
        p-0 d-flex flex-row align-items-center"
        >
            <button 
            className="list-group-add-to-do-submit d-flex 
            justify-content-center align-items-center p-0 position-absolute ms-3" 
            type="submit"
            >
                <svg 
                className="list-group-add-to-do-plus"
                xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" viewBox="0 0 24 24" 
                >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            type="text" 
            className="list-group-add-to-do-list-input py-3"
            placeholder="Add a task" 
            value={value}
            onChange={(event) => setValue(event.target.value)}
            />
            <div className="list-group-input-after"></div>
        </form>
    )
}

export default AddToListGroup
