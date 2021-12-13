import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchForm from "../SearchForm/SearchForm";
import { seacrhtoggleComplete, searchToggleImportant,
    removeFromSearch, updateSearch } from "../../redux/search";
import { importantToggleCompleteByTasks, addToImportantTodo,
    removeFromImportantByTasks, updateImportantByTasks } from "../../redux/importantTodo";
import { tasksToggleImportantByImportant,
    tasksToggleCompleteByOthers, removeFromTasks,
    updateTasks } from "../../redux/tasksTodo";
import { addToUpdateCompletedTasks } from "../../redux/updateCompletedTasks";
import { MyDayToggleImportantByImportant, MyDayToggleCompleteByTasks,
    removeFromMyDayByTasks, updateMyDayByTasks } from "../../redux/myDayTodo";
import { plannedToggleImportantByImportant, plannedToggleCompleteByTasks,
    removeFromPlannedByTasks, updatePlannedByTasks } from "../../redux/plannedTodo";
import { listGroupToggleImportantByImportant, listGrouptoggleCompleteByImportant,
    removeFromListGroupByImportant, updateListGroupByImportant } from '../../redux/listGroup'

function Search(props) {
    const [search, setSearch] = useState('')
    const [searchTrue, setSearchTrue] = useState('')
    const dispatch = useDispatch()
    const seacrhLists = useSelector((state) => state.searchTodo)
    const searchTrueLength = seacrhLists.filter((todo) => todo.display === true).length

    useEffect(() => {
        setSearchTrue(
            searchTrueLength
        )
    }, [searchTrueLength])

    useEffect(() => {
        setSearch(
            seacrhLists.map(item => 
                item.display === true &&
                <div 
                key={item.id}
                className="my-day-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 my-day-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`tasks-checkbox-${item.id}`} 
                        checked={item.completed}
                        onChange={() => 
                            {
                                handleChange(item.id, item.audio);
                                dispatch(seacrhtoggleComplete({id: item.id, completed: !item.completed}))
                                handleTasksCompleted(item.groupList, item.tag, item.completed)
                                item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                            }
                        }
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`tasks-task-name-${item.id}`}
                        className="my-day-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="my-day-task-group m-0">{item.group}</p>
                    </div>
                    <svg  
                    id={`my-day-task-svg-${item.id}`}
                    className={`my-day-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    onClick={() => {
                        dispatch(searchToggleImportant({id: item.id, important: !item.important}))
                        dispatch(addToUpdateCompletedTasks({tag: item.tag}))
                        setTimeout(() => {handleImportant(item.tag, item.name, !item.important, item.group, item.completed, item.groupList)}, 10);
                    }}
                    >
                        <path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 
                        18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 
                        1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 
                        8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 
                        0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 
                        2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 
                        0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z">
                        </path>
                    </svg>
                    <button 
                    id={`tasks-main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.groupList, item.id, item.important)}
                    >
                        Remove
                    </button>
                </div>
            )
        )
    }, [seacrhLists])

    function handleImportant(tag, name, important, group, completed, groupList) {
        if(important === true) {
            dispatch(addToImportantTodo({
                name: name,
                group: group,
                completed: completed,
                tag: tag,
                groupList: props.name === '' ? groupList : props.name,
                important: true
            }))
        }else {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
        if(groupList === 'my day') {
            dispatch(MyDayToggleImportantByImportant({tag: tag, important: important}))
            dispatch(tasksToggleImportantByImportant({tag: tag, important: important}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleImportantByImportant({tag: tag, important: important}))
            dispatch(tasksToggleImportantByImportant({tag: tag, important: important}))
        }
        if(groupList === 'tasks') {
            dispatch(tasksToggleImportantByImportant({tag: tag, important: important}))
        }
        dispatch(listGroupToggleImportantByImportant({tag: tag, important: important}))
        dispatch(addToUpdateCompletedTasks({tag: tag}))
    }

    function handleTasksCompleted(groupList, tag, completed) {
        if(groupList === 'my day') {
            dispatch(MyDayToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
        }
        if(groupList === 'important') {
            dispatch(importantToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
        }
        if(groupList === 'tasks') {
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
        }
        dispatch(listGrouptoggleCompleteByImportant({tag: tag, completed: !completed}))
        dispatch(addToUpdateCompletedTasks({tag: tag}))
    }

    function handleTasksDelete(tag, groupList, id, important) {
        dispatch(removeFromTasks({id: id})); 
        dispatch(updateTasks({id: id}))
        dispatch(removeFromSearch({id: id})); 
        dispatch(updateSearch({id: id}))
        if(groupList === 'my day') {
            dispatch(removeFromMyDayByTasks({tag: tag})); 
            dispatch(updateMyDayByTasks({tag: tag}))
        }
        if(groupList === 'important') {
            dispatch(removeFromImportantByTasks({tag: tag})); 
            dispatch(updateImportantByTasks({tag: tag}))
        }
        if(groupList === 'planned') {
            dispatch(removeFromPlannedByTasks({tag: tag})); 
            dispatch(updatePlannedByTasks({tag: tag}))
        }
        dispatch(removeFromListGroupByImportant({tag: tag})); 
        dispatch(updateListGroupByImportant({tag: tag}))
        if(important === true) {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
    }
    
    function handleMouseOver(id) {
        for(var i = 1; i < seacrhLists.length + seacrhLists.length + 1; i++) {
            document.getElementById('tasks-main-list-remove-' + i) !== null &&
            document.getElementById('tasks-main-list-remove-' + i).classList.remove('extra-main-list-remove')
        }
        document.getElementById('tasks-main-list-remove-' + id) !== null &&
        document.getElementById('tasks-main-list-remove-' + id).classList.add('extra-main-list-remove')
    }

    function handleMouseOut(id) {
        document.getElementById('tasks-main-list-remove-' + id) !== null &&
        document.getElementById('tasks-main-list-remove-' + id).classList.remove('extra-main-list-remove')
    }

    function handleChange(id, audio) {
        const checkbox = document.getElementById('tasks-checkbox-' + id)
        if(checkbox.checked) {
            document.getElementById('tasks-task-name-' + id).classList.add('task-complete-underline')
            audio.play();
        }else {
            document.getElementById('tasks-task-name-' + id).classList.remove('task-complete-underline')
        }
    }

    return (
        <div className="container-fluid border-start border-muted pt-5 vh-100" style={{padding: 42}}>
             <SearchForm />  
             <div 
             style={{display: `${searchTrue === 0 ? "none" : "block"}`}}
             className="search-tasks-container mt-3 pt-2">
                 {search}
             </div>
             <div className="container text-center" 
             style={{marginTop: "22%", display: `${searchTrue === 0 ? "block" : "none"}`}}>
                <img src="https://img.icons8.com/clouds/150/000000/search.png" alt="" />
                <p className="h6 mt-3">Here you can search for all the tasks <br/> and make the desired changes to them</p>
             </div>
        </div>
    )
}

export default Search
