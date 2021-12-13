import React, { useEffect, useState } from 'react'
import AddToPlanned from '../AddToPlanned/AddToPlanned'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPlanned, updatePlanned, plannedToggleComplete, plannedToggleImportant } from '../../redux/plannedTodo'
import { removeFromTasksByOthers, updateTasksByOthers, tasksToggleCompleteByOthers, 
    tasksToggleImportantByImportant } from '../../redux/tasksTodo'
import { addToUpdateCompletedTasks } from '../../redux/updateCompletedTasks'
import { importantToggleCompleteByTasks, addToImportantTodo, removeFromImportantByTasks, 
    updateImportantByTasks } from '../../redux/importantTodo'
import { seacrhtoggleCompleteByOthers, searchToggleImportantByOthers,
    removeFromSearchByOthers, updateSearchByOthers } from '../../redux/search'

function Planned() {
    const [plannedToday, setPlannedToday] = useState('')
    const [plannedTomorrow, setPlannedTomorrow] = useState('')
    const [plannedNextWeek, setPlannedNextWeek] = useState('')
    const plannedListToday = useSelector((state) => state.plannedTodo)
    const localString = useSelector((state) => state.updateCompletedTasks)
    const plannedListTomorrow = [
        // {id: 1, name: 'task 1', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'tomorrow'},
        // {id: 2, name: 'task 2', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'tomorrow'},
        // {id: 3, name: 'task 3', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'tomorrow'}
    ]
    const plannedListNextWeek = [
        // {id: 1, name: 'task 1', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'Sun, Nov 18'},
        // {id: 2, name: 'task 2', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'Sun, Nov 15'},
        // {id: 3, name: 'task 3', group: 'tasks', completed: false, audio: new Audio(mp3_file), tag: 'Mon, Nov 10'}
    ]
    const dispatch = useDispatch()

    useEffect(() => {
        if(plannedListToday.length !== 0 || plannedListTomorrow.length !== 0 || plannedListNextWeek.length !== 0) {
            document.getElementById('planned-image-container').classList
            .add('extra-planned-image-container')
            document.getElementById('planned-image-main-container').classList
            .add('extra-planned-image-container')
        }else {
            document.getElementById('planned-image-container').classList
            .remove('extra-planned-image-container')
            document.getElementById('planned-image-main-container').classList
            .remove('extra-planned-image-container')
        }
    }, [plannedListToday.length, plannedListTomorrow.length, plannedListNextWeek.length])

    useEffect(() => {
        setPlannedToday(
            plannedListToday.map(item => 
                <div 
                key={item.id}
                className="planned-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 planned-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`planned-checkbox-${item.id}`} 
                        checked={item.completed}
                        onChange={
                            () => {
                                handleChange(item.id, item.audio); 
                                dispatch(plannedToggleComplete({id:item.id, completed: !item.completed}));
                                dispatch(tasksToggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                                dispatch(addToUpdateCompletedTasks({tag: item.tag}))
                            }
                        }
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`planned-task-name-${item.id}`}
                        className="planned-task-name m-0" 
                        style={item.completed === true ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                        >
                            {item.name}
                        </p>
                        <p className="planned-task-group m-0">
                        {item.group} . <span style={{color: "#436af2"}}>{item.groupList}</span>
                        </p>
                    </div>
                    <svg  
                    id={`planned-task-svg-${item.id}`}
                    className={`planned-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    onClick={() => {
                        dispatch(plannedToggleImportant({id: item.id, important: !item.important}))
                        dispatch(tasksToggleImportantByImportant({tag: item.tag, important: !item.important}))
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !item.important}))
                        dispatch(addToUpdateCompletedTasks({tag: item.tag}))
                        setTimeout(() => {handleImportant(item.tag, item.name, !item.important, item.completed)}, 10);
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
                    id={`planned-main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id)}
                    >
                        Remove
                    </button>
                </div>
            )
        )
        setPlannedTomorrow(
            plannedListTomorrow.map(item =>
                <div 
                key={item.id}
                className="planned-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id + plannedListToday.length)}
                onMouseOut={() => handleMouseOut(item.id + plannedListToday.length)}
                >
                    <label className="me-3 planned-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`planned-checkbox-${item.id + plannedListToday.length}`} 
                        // checked={item.completed}
                        onChange={() => handleChange(item.id + plannedListToday.length, item.audio)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`planned-task-name-${item.id + plannedListToday.length}`}
                        className="planned-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="planned-task-group m-0">
                        {item.group} . {item.tag}
                        </p>
                    </div>
                    <svg  
                    id={`planned-task-svg-${item.id}`}
                    className="planned-task-svg position-absolute"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
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
                    id={`planned-main-list-remove-${item.id + plannedListToday.length}`}
                    className="position-absolute main-list-remove"
                    >
                        Remove
                    </button>
                </div> 
            )
        )
        setPlannedNextWeek(
            plannedListNextWeek.map(item => 
                <div 
                key={item.id}
                className="planned-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id + plannedListTomorrow.length
                        + plannedListToday.length)}
                onMouseOut={() => handleMouseOut(item.id + plannedListTomorrow.length
                        + plannedListToday.length)}
                >
                    <label className="me-3 planned-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`planned-checkbox-${item.id + plannedListTomorrow.length
                        + plannedListToday.length}`} 
                        // checked={item.completed}
                        onChange={() => handleChange(item.id + plannedListTomorrow.length
                        + plannedListToday.length, item.audio)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`planned-task-name-${item.id + plannedListTomorrow.length
                        + plannedListToday.length}`}
                        className="planned-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="planned-task-group m-0">
                        {item.group} . {item.tag}
                        </p>
                    </div>
                    <svg  
                    id={`planned-task-svg-${item.id}`}
                    className="planned-task-svg position-absolute"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
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
                    id={`planned-main-list-remove-${item.id + plannedListTomorrow.length
                        + plannedListToday.length}`}
                    className="position-absolute main-list-remove"
                    >
                        Remove
                    </button>
                </div>
            )
        )
    }, [plannedListToday.length, localString.length])

    function handleImportant(tag, name, important, completed) {
        if(important === true) {
            dispatch(addToImportantTodo({
                name: name,
                group: 'tasks . planned',
                completed: completed,
                tag: tag,
                groupList: 'planned',
                important: true
            }))
        }else {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
    }

    function handleTasksDelete(tag, id) {
        dispatch(removeFromPlanned({id: id}))
        dispatch(updatePlanned({id: id}))
        dispatch(removeFromTasksByOthers({tag: tag})); 
        dispatch(updateTasksByOthers({tag: tag}))
        dispatch(removeFromImportantByTasks({tag: tag}))
        dispatch(updateImportantByTasks({tag: tag}))
        dispatch(removeFromSearchByOthers({tag: tag}))
        dispatch(updateSearchByOthers({tag: tag}))
    }

    function handleMouseOver(id) {
        for(var i = 1; i < plannedListToday.length + plannedListTomorrow.length + plannedListNextWeek.length + 1; i++) {
            document.getElementById('planned-main-list-remove-' + i).classList.remove('extra-main-list-remove')
        }
        document.getElementById('planned-main-list-remove-' + id).classList.add('extra-main-list-remove')
    }

    function handleMouseOut(id) {
        document.getElementById('planned-main-list-remove-' + id).classList.remove('extra-main-list-remove')
    }

    function handleChange(id, audio) {
        const checkbox = document.getElementById('planned-checkbox-' + id)
        if(checkbox.checked) {
            audio.play();
        }
    }

    return (
        
        <div className="container-fluid planned-container" style={{padding: 42}}>
            <div className="d-flex flex-row align-items-center mb-4">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                style={{fill: "rgba(22, 111, 107, 1)"}}>
                    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z">
                    </path>
                    <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 
                    0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z">
                    </path>
                </svg>
                <p className="planned-title ms-3 mb-0">Planned</p>
            </div>

            <div className="planned-tasks-container">
                <button 
                type="button" 
                class="plannedToday-completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#plannedTodayDemo"
                style={plannedToday.length === 0 ? {display: 'none'} : {display: 'block'}}
                >
                    <svg 
                    id="plannedToday-completed-svg"
                    className="plannedToday-completed-svg"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 
                        12l-4.293 4.293z">
                        </path>
                    </svg>
                    Today <span>&nbsp;&nbsp;</span> 
                    {
                        plannedListToday.filter((todo) => todo.completed === false).length !== 0 &&
                        plannedListToday.filter((todo) => todo.completed === false).length
                    }
                </button>
                <div
                id="plannedTodayDemo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>
                    {plannedToday}
                </div>

                <button 
                type="button" 
                class="plannedTomorrow-completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#plannedTomorrowDemo"
                style={plannedListTomorrow.length === 0 ? {display: 'none'} : {display: 'block'}}
                >
                    <svg 
                    id="plannedTomorrow-completed-svg"
                    className="plannedTomorrow-completed-svg"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 
                        12l-4.293 4.293z">
                        </path>
                    </svg>
                    Tomorrow <span>&nbsp;&nbsp;</span> 1
                </button>
                <div 
                id="plannedTomorrowDemo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>  
                    {plannedTomorrow}
                </div>

                <button 
                type="button" 
                class="plannedNextWeek-completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#plannedNextWeekDemo"
                style={plannedListNextWeek.length === 0 ? {display: 'none'} : {display: 'block'}}
                >
                    <svg 
                    id="plannedNextWeek-completed-svg"
                    className="plannedNextWeek-completed-svg"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 
                        12l-4.293 4.293z">
                        </path>
                    </svg>
                    Next week <span>&nbsp;&nbsp;</span> 1
                </button>
                <div 
                id="plannedNextWeekDemo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>
                    {plannedNextWeek}
                </div>
            </div>
            <div 
            id="planned-image-main-container"
            className="container-fluid planned-image-main-container mt-5 py-5">
                <div 
                id="planned-image-container"
                className="planned-image-container position-relative text-center"
                >
                    <img 
                    alt=""
                    src="https://img.icons8.com/clouds/150/000000/planner.png"
                    className="planned-image"
                    />
                    <p className="planned-image-content mt-3">Tasks with dou dates or reminders show<br/> up here.</p>
                </div>
            </div>
            <AddToPlanned />
        </div>
    )
}

export default Planned
