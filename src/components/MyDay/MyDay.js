import React, { useEffect, useState } from 'react'
import AddToMyDayList from '../AddToMyDayList/AddToMyDayList'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromMyDay, updateMyDay, MyDaytoggleComplete, MyDayToggleImportant } from '../../redux/myDayTodo'
import { removeFromTasksByOthers, updateTasksByOthers, tasksToggleCompleteByOthers,
    tasksToggleImportantByImportant } from '../../redux/tasksTodo'
import { addToUpdateCompletedTasks } from '../../redux/updateCompletedTasks'
import { addToImportantTodo, removeFromImportantByTasks, updateImportantByTasks,
    importantToggleCompleteByTasks } from '../../redux/importantTodo'
import { seacrhtoggleCompleteByOthers, searchToggleImportantByOthers,
    removeFromSearchByOthers, updateSearchByOthers } from '../../redux/search'

function MyDay() {
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [week, setWeek] = useState('')
    const [myDay, setMyDay] = useState('')
    const [myDayCompleted, setMyDayCompleted] = useState('')
    const [timeOutId, setTimeOutId] = useState('')
    const [completedJsxUpdate, setCompletedJsxUpdate] = useState(0)
    const myDayLists = useSelector((state) => state.myDayTodo)
    const localString = useSelector((state) => state.updateCompletedTasks)
    const completedLength = myDayLists.filter((todo) => todo.completed === true).length
    const notCompletedLength = myDayLists.filter((todo) => todo.completed === false).length
    const dispatch = useDispatch()

    useEffect(() => {
        if(notCompletedLength !== 0 || completedLength !== 0) {
            document.getElementById('my-day-image-container').classList
            .add('extra-my-day-image-container')
            document.getElementById('my-day-image-main-container').classList
            .add('extra-my-day-image-container')
        }else {
            document.getElementById('my-day-image-container').classList
            .remove('extra-my-day-image-container')
            document.getElementById('my-day-image-main-container').classList
            .remove('extra-my-day-image-container')
        }

        if(completedLength !== 0) {
            document.getElementById('completed-collapse-btn').classList.add('extra-completed')
        }else {
            document.getElementById('completed-collapse-btn').classList.remove('extra-completed')
        }
    }, [notCompletedLength, completedLength !== 0])
    
    useEffect(() => {
        setMyDay(
            myDayLists.map(item => 
                item.completed === false &&
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
                        id={`my-day-checkbox-${item.id}`} 
                        onChange={() => 
                            {
                                handleChange(item.id, item.audio);
                                dispatch(MyDaytoggleComplete({id: item.id, completed: !item.completed}))
                                dispatch(tasksToggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                                setTimeOutId(setTimeout(() => {updateJSXonCheck(item.tag)}, 20))
                            }
                        }
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`my-day-task-name-${item.id}`}
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
                        dispatch(MyDayToggleImportant({id: item.id, important: !item.important}))
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
                    id={`main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id)}
                    >
                        Remove
                    </button>
                </div>
            )
        )

        setMyDayCompleted(
            myDayLists.map(item => 
                item.completed === true &&
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
                        id={`my-day-checkbox-${item.id}`} 
                        checked={item.completed}
                        onChange={() => 
                            {
                                dispatch(MyDaytoggleComplete({id: item.id, completed: !item.completed}))
                                dispatch(tasksToggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                                setTimeOutId(setTimeout(() => {updateJSXonCheck(item.tag)}, 20))
                            }
                        }
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`my-day-task-name-${item.id}`}
                        className="my-day-task-name m-0" 
                        style={item.completed === true ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
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
                        dispatch(MyDayToggleImportant({id: item.id, important: !item.important}))
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
                    id={`main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id)}
                    >
                        Remove
                    </button>
                </div>
            )
        )
    }, [myDayLists.length, completedJsxUpdate, localString.length])

    function handleImportant(tag, name, important, completed) {
        if(important === true) {
            dispatch(addToImportantTodo({
                name: name,
                group: 'tasks . my day',
                completed: completed,
                tag: tag,
                groupList: 'my day',
                important: true
            }))
        }else {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
    }

    function handleTasksDelete(tag, id) {
        dispatch(removeFromMyDay({id: id}))
        dispatch(updateMyDay({id: id}))
        dispatch(removeFromTasksByOthers({tag: tag})); 
        dispatch(updateTasksByOthers({tag: tag}))
        dispatch(removeFromImportantByTasks({tag: tag}))
        dispatch(updateImportantByTasks({tag: tag}))
        dispatch(removeFromSearchByOthers({tag: tag}))
        dispatch(updateSearchByOthers({tag: tag}))
    }

    function updateJSXonCheck(tag) {
        setCompletedJsxUpdate(completedJsxUpdate + 1)
        dispatch(addToUpdateCompletedTasks({tag: tag}))
        clearTimeout(timeOutId)
    }

    function handleChange(id, audio) {
        const checkbox = document.getElementById('my-day-checkbox-' + id)
        if(checkbox.checked) {
            document.getElementById('my-day-task-name-' + id).classList.add('task-complete-underline')
            audio.play();
        }else {
            document.getElementById('my-day-task-name-' + id).classList.remove('task-complete-underline')
        }
    }

    function handleMouseOver(id) {
        for(var i = 1; i < myDayLists.length + 1; i++) {
            document.getElementById('main-list-remove-' + i) !== null &&
            document.getElementById('main-list-remove-' + i).classList.remove('extra-main-list-remove')
        }
        document.getElementById('main-list-remove-' + id) !== null &&
        document.getElementById('main-list-remove-' + id).classList.add('extra-main-list-remove')
    }

    function handleMouseOut(id) {
        document.getElementById('main-list-remove-' + id) !== null &&
        document.getElementById('main-list-remove-' + id).classList.remove('extra-main-list-remove')
    }

    useEffect(() => {
        setDay(new Date().getDate())
        setMonth(new Date().toLocaleString('default', {month: 'long'}))
        setWeek(new Date().toLocaleString('local', {weekday: 'long'}))
    }, [day])

    return (
        
        <div className="container-fluid my-day-container" style={{padding: 42}}>
            <p className="my-day-title mb-0">My Day</p>
            <p className="mb-3 my-day-date">{week}, {month} {day}</p>
            <div className="my-day-tasks-container">
                {myDay}
                <button 
                type="button" 
                id="completed-collapse-btn"
                class="completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#demo"
                >
                    <svg 
                    id="completed-svg"
                    className="completed-svg"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 
                        12l-4.293 4.293z">
                        </path>
                    </svg>
                    Completed <span>&nbsp;&nbsp;</span> 
                    { completedLength !== 0 && completedLength }
                </button>
                <div id="demo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>
                    {myDayCompleted}
                </div>
            </div>
            <div 
            id="my-day-image-main-container"
            className="container-fluid my-day-image-main-container py-5">
                <div 
                id="my-day-image-container"
                className="my-day-image-container position-relative text-center"
                >
                    <img 
                    alt=""
                    src="https://img.icons8.com/clouds/100/000000/edit-calendar.png"
                    className="my-day-image"
                    />
                    <p className="my-day-image-title">Focus on your day</p>
                    <p className="my-day-image-content">Get things done with my day, a list that<br/> refreshes every day.</p>
                    <div className="my-day-image-after"></div>
                </div>
            </div>
            <AddToMyDayList />
        </div>
    )
}

export default MyDay
