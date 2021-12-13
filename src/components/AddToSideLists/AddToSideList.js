import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToSideList } from '../../redux/sideList'

function AddToSideList({types}) {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        value !== '' &&
                dispatch(addToSideList({
                    name: value
                }))
        checkInputs()
        setValue('')
    }

    function checkInputs() {
        // trim to remove the whitespaces
        const addList = document.getElementById('id-' + types);
        const addListInputValue = addList.value.trim();
        
        if(addListInputValue === '') {
            setErrorFor(addList, 'List name is required');
        } else {
            setErrorFor(addList, '');
        }
    }

    function setErrorFor(input, message) {
        const formControlCognito = input.parentElement;
        const small = formControlCognito.querySelector('small');
        formControlCognito.className = 'form-control-cognito error';
        small.innerText = message;
    }

    function handleChange(event) {
        setValue(event.target.value)

        const addList = document.getElementById('id-' + types);
        setErrorFor(addList, '')
    }

    return (
        <form onSubmit={onSubmit} className="form-control-cognito">
            <button className="add-to-list-submit-btn">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                style={{fill: "rgba(141, 141, 142, 1)"}}>
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z">
                    </path>
                </svg>
            </button>
            <input 
            className="add-to-list-input" 
            type="text" 
            id={`id-${types}`}
            value={value}
            onChange={handleChange}
            placeholder="New list"
            />
            <small></small>
        </form>
    )
}

export default AddToSideList
