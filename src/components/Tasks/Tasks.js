import React, { useEffect, useState } from 'react'
import AddToTasksList from '../AddToTasks/AddToTasksList'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromTasks, updateTasks, tasksToggleComplete, tasksToggleImportant } from '../../redux/tasksTodo'
import { removeFromMyDayByTasks, updateMyDayByTasks, MyDayToggleCompleteByTasks,
    MyDayToggleImportantByImportant } from '../../redux/myDayTodo'
import { removeFromImportantByTasks, updateImportantByTasks, importantToggleCompleteByTasks,
    addToImportantTodo } from '../../redux/importantTodo'
import { removeFromPlannedByTasks, updatePlannedByTasks, plannedToggleCompleteByTasks, 
    plannedToggleImportantByImportant } from '../../redux/plannedTodo'
import { addToUpdateCompletedTasks } from '../../redux/updateCompletedTasks'
import { seacrhtoggleCompleteByOthers, searchToggleImportantByOthers,
    removeFromSearchByOthers, updateSearchByOthers } from '../../redux/search'


export default function Tasks() {
    const [tasks, setTasks] = useState('')
    const [tasksCompleted, setTasksCompleted] = useState('')
    const [timeOutId, setTimeOutId] = useState('')
    const [completedJsxUpdate, setCompletedJsxUpdate] = useState(0)
    const taskLists = useSelector((state) => state.tasksTodo)
    const localString = useSelector((state) => state.updateCompletedTasks)
    const completedLength = taskLists.filter((todo) => todo.completed === true).length
    const notCompletedLength = taskLists.filter((todo) => todo.completed === false).length
    const dispatch = useDispatch()

    useEffect(() => {
        setTasks(
            taskLists.map(item => 
                item.completed === false &&
                <div 
                key={item.id}
                className="tasks-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 tasks-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`tasks-checkbox-${item.id}`} 
                        onChange={() => {
                            handleChange(item.id, item.audio);
                            dispatch(tasksToggleComplete({id: item.id, completed: !item.completed}))
                            dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                            handleTasksCompleted(item.groupList, item.tag, item.completed)
                            item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                            setTimeOutId(setTimeout(() => {updateJSXonCheck(item.tag)}, 20))
                        }}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`tasks-task-name-${item.id}`}
                        className="tasks-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="tasks-task-group m-0">{item.group}</p>
                    </div>
                    <svg  
                    id={`tasks-task-svg-${item.id}`}
                    className={`tasks-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    onClick={() => {
                        dispatch(tasksToggleImportant({id: item.id, important: !item.important}));
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !item.important}))
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

        setTasksCompleted(
            taskLists.map(item => 
                item.completed === true &&
                <div 
                key={item.id}
                className="tasks-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id + taskLists.length)}
                onMouseOut={() => handleMouseOut(item.id + taskLists.length)}
                >
                    <label className="me-3 tasks-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`tasks-checkbox-${item.id}`} 
                        checked={item.completed}
                        onChange={() => {
                            dispatch(tasksToggleComplete({id: item.id, completed: !item.completed}))
                            dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                            handleTasksCompleted(item.groupList, item.tag, item.completed)
                            item.important === true && dispatch(importantToggleCompleteByTasks({tag: item.tag, completed: !item.completed}))
                            setTimeOutId(setTimeout(() => {updateJSXonCheck(item.tag)}, 20))
                        }}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`tasks-task-name-${item.id}`}
                        className="tasks-task-name m-0" 
                        style={item.completed === true ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                        >
                            {item.name}
                        </p> 
                        <p className="tasks-task-group m-0">
                            {item.group}
                        </p>
                    </div>
                    <svg  
                    id={`tasks-task-svg-${item.id}`}
                    className={`tasks-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    onClick={() => {
                        dispatch(tasksToggleImportant({id: item.id, important: !item.important}))
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !item.important}))
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
                    id={`tasks-main-list-remove-${item.id + taskLists.length}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.groupList, item.id, item.important)}
                    >
                        Remove
                    </button>
                </div>
            )
        )
    }, [taskLists.length, completedJsxUpdate, localString.length])

    function handleImportant(tag, name, important, group, completed, groupList) {
        if(important === true) {
            dispatch(addToImportantTodo({
                name: name,
                group: group,
                completed: completed,
                tag: tag,
                groupList: groupList,
                important: true
            }))
        }else {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
        if(groupList === 'my day') {
            dispatch(MyDayToggleImportantByImportant({tag: tag, important: important}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleImportantByImportant({tag: tag, important: important}))
        }
        dispatch(addToUpdateCompletedTasks({tag: tag}))
    }

    function handleTasksCompleted(groupList, tag, completed) {
        if(groupList === 'my day') {
            dispatch(MyDayToggleCompleteByTasks({tag: tag, completed: !completed}))
        }
        if(groupList === 'important') {
            dispatch(importantToggleCompleteByTasks({tag: tag, completed: !completed}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleCompleteByTasks({tag: tag, completed: !completed}))
        }
    }

    function handleTasksDelete(tag, groupList, id, important) {
        dispatch(removeFromTasks({id: id}))
        dispatch(updateTasks({id: id}))
        dispatch(removeFromSearchByOthers({tag: tag}))
        dispatch(updateSearchByOthers({tag: tag}))
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
        if(important === true) {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
    }

    function updateJSXonCheck(tag) {
        setCompletedJsxUpdate(completedJsxUpdate + 1)
        dispatch(addToUpdateCompletedTasks({tag: tag}))
        clearTimeout(timeOutId)
    }

    function handleMouseOver(id) {
        for(var i = 1; i < taskLists.length + tasksCompleted.length + 1; i++) {
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

    useEffect(() => {
        if(notCompletedLength !== 0 || completedLength !== 0) {
            document.getElementById('tasks-image-container').classList
            .add('extra-tasks-image-container')
            document.getElementById('tasks-image-main-container').classList
            .add('extra-tasks-image-container')
        }else {
            document.getElementById('tasks-image-container').classList
            .remove('extra-tasks-image-container')
            document.getElementById('tasks-image-main-container').classList
            .remove('extra-tasks-image-container')
        }
    }, [notCompletedLength, completedLength])

    return (
        
        <div className="container-fluid tasks-container" style={{padding: 42}}>
            <div className="d-flex flex-row align-items-center mb-4">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                style={{fill: "rgba(255, 255, 255, 1)"}}>
                    <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 
                    1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 
                    7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 
                    0-2 .897-2 2v5H6v-9.586l6-6z">
                    </path>
                </svg>
                <p className="tasks-title ms-3 mb-0">Tasks</p>
            </div>
            <div 
            id="tasks-tasks-container"
            className="tasks-tasks-container">
                {tasks}
                <button 
                type="button" 
                class="tasks-completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#tasksCompletedDemo"
                style={completedLength === 0 ? {display: 'none'} : {display: 'block'}}
                >
                    <svg 
                    id="tasks-completed-svg"
                    className="tasks-completed-svg"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 
                        12l-4.293 4.293z">
                        </path>
                    </svg>
                    Completed <span>&nbsp;&nbsp;</span> 
                    { completedLength }
                </button>
                <div id="tasksCompletedDemo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>
                    {tasksCompleted}
                </div>
            </div>
            <div 
            id="tasks-image-main-container"
            className="container-fluid tasks-image-main-container py-5">
                <div 
                id="tasks-image-container"
                className="tasks-image-container position-relative text-center"
                >
                    <img 
                    alt=""
                    src="https://img.icons8.com/clouds/150/000000/checklist.png"
                    className="tasks-image"
                    />
                    <p className="tasks-image-content mt-3">Tasks with dou dates or reminders show<br/> up here.</p>
                </div>
            </div>
            <AddToTasksList />
        </div>
    )
}
