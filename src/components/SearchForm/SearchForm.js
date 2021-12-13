import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchTodoName } from "../../redux/search";

function SearchForm() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
   
    // function handleChange(event) {
    //     setValue(event.target.value) ;dispatch(searchTodoName({name: value}))
        
    // }

    function onSubmit(event) {
        event.preventDefault()
        setValue('')
    }
    return (
        <form onSubmit={onSubmit} className="bg-white search-form">
            <input 
            value={value}
            onChange={(event) => {setValue(event.target.value); 
            dispatch(searchTodoName({name: event.target.value}))}}
            type="text" className="form-control" placeholder="Search..."/>
        </form>
    )
}

export default SearchForm
