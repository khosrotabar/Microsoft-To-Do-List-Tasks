import React, { useEffect, useState } from 'react'
import AddToImportantList from '../AddToImportantList/AddToImportantList'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromImportant, updateImportant, importantToggleComplete,
    importantToggleCompleteByTasks } from '../../redux/importantTodo'
import { removeFromTasksByOthers, updateTasksByOthers, tasksToggleCompleteByOthers,
    tasksToggleImportantByImportant } from '../../redux/tasksTodo'
import { addToUpdateCompletedTasks } from '../../redux/updateCompletedTasks'
import { MyDayToggleImportantByImportant, removeFromMyDayByTasks, updateMyDayByTasks,
    MyDayToggleCompleteByTasks } from '../../redux/myDayTodo'
import { removeFromPlannedByTasks, plannedToggleImportantByImportant, 
    updatePlannedByTasks, plannedToggleCompleteByTasks } from '../../redux/plannedTodo'
import { removeFromListGroupByImportant, listGroupToggleImportantByImportant,
    updateListGroupByImportant, listGrouptoggleCompleteByImportant } from '../../redux/listGroup'
import { seacrhtoggleCompleteByOthers, removeFromSearchByOthers,
    updateSearchByOthers, searchToggleImportantByOthers } from '../../redux/search'

function Important() {
    const [important, setImportant] = useState('')
    const importantList = useSelector((state) => state.importantTodo)
    const localString = useSelector((state) => state.updateCompletedTasks)
    const [timeOutId, setTimeOutId] = useState('')
    const [completedJsxUpdate, setCompletedJsxUpdate] = useState(0)
    const notCompletedLength = importantList.filter((todo) => todo.completed === false).length
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(notCompletedLength !== 0) {
            document.getElementById('important-image-container').classList
            .add('extra-important-image-container')
            document.getElementById('important-image-main-container').classList
            .add('extra-important-image-container')
        }else {
            document.getElementById('important-image-container').classList
            .remove('extra-important-image-container')
            document.getElementById('important-image-main-container').classList
            .remove('extra-important-image-container')
        }
    }, [notCompletedLength])

    useEffect(() => {
        setImportant(
            importantList.map(item =>
                (item.completed === false && item.important === true) && 
                <div 
                key={item.id}
                className="important-task-container px-3 py-2 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 important-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`important-checkbox-${item.id}`} 
                        onChange={
                            () => {
                                handleChange(item.id, item.audio);
                                dispatch(importantToggleComplete({id: item.id, completed: !item.completed}))
                                dispatch(seacrhtoggleCompleteByOthers({tag: item.tag, completed: !item.completed}))
                                handleCompletedForOthers(item.tag, item.completed, item.groupList)
                                setTimeOutId(setTimeout(() => {updateJSXonCheck(item.tag)}, 20))
                            }
                        }
                        />
                        <span className="checkmark"></span>
                    </label>
                    <div className="d-flex flex-column">
                        <p 
                        id={`important-task-name-${item.id}`}
                        className="important-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="important-task-group m-0">{item.group}</p>
                    </div>
                    <svg  
                    id={`important-task-svg-${item.id}`}
                    className="important-task-svg position-absolute"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" type="solid"
                    style={item.groupList !== 'important' ? {cursor: "pointer"} : null}
                    onClick={() => {
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !important}))
                        handleImportant(item.tag, item.important, item.groupList, item.id);
                    }}
                    >
                        <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 
                        0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 
                        1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 
                        4.536-4.082c.297-.268.406-.686.278-1.065z">
                        </path>
                    </svg>
                    <button 
                    id={`important-main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id, item.groupList)}
                    >
                        Remove
                    </button>
                </div>
            )
        )
    }, [importantList.length, completedJsxUpdate, localString.length])

    function handleCompletedForOthers(tag, completed, groupList) {
        if(groupList === 'my day') {
            dispatch(MyDayToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        if(groupList === 'tasks') {
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        if(groupList === 'important') {
            dispatch(importantToggleCompleteByTasks({tag: tag, completed: !completed}))
            dispatch(tasksToggleCompleteByOthers({tag: tag, completed: !completed}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        dispatch(seacrhtoggleCompleteByOthers({tag: tag, completed: !completed}))
        dispatch(listGrouptoggleCompleteByImportant({tag: tag, completed: !completed}))
        dispatch(addToUpdateCompletedTasks({tag: tag}))
    }

    function handleImportant(tag, important, groupList, id) {
        if(groupList === 'my day') {
            dispatch(MyDayToggleImportantByImportant({tag: tag, important: !important}))
            dispatch(tasksToggleImportantByImportant({tag: tag, important: !important}))
            dispatch(removeFromImportant({id: id}))
            dispatch(updateImportant({id: id}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        if(groupList === 'tasks') {
            dispatch(tasksToggleImportantByImportant({tag: tag, important: !important}))
            dispatch(removeFromImportant({id: id}))
            dispatch(updateImportant({id: id}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        if(groupList === 'planned') {
            dispatch(plannedToggleImportantByImportant({tag: tag, important: !important}))
            dispatch(tasksToggleImportantByImportant({tag: tag, important: !important}))
            dispatch(removeFromImportant({id: id}))
            dispatch(updateImportant({id: id}))
            dispatch(addToUpdateCompletedTasks({tag: tag}))
        }
        dispatch(listGroupToggleImportantByImportant({tag: tag, important: !important}))
        dispatch(removeFromImportant({id: id}))
        dispatch(updateImportant({id: id}))
        dispatch(addToUpdateCompletedTasks({tag: tag}))
    }

    function handleTasksDelete(tag, id, groupList) {
        dispatch(removeFromImportant({id: id}))
        dispatch(updateImportant({id: id}))
        dispatch(removeFromTasksByOthers({tag: tag})); 
        dispatch(updateTasksByOthers({tag: tag}))
        if(groupList === 'my day') {
            dispatch(removeFromMyDayByTasks({tag: tag}))
            dispatch(updateMyDayByTasks({tag: tag}))
        }
        if(groupList === 'planned') {
            dispatch(removeFromPlannedByTasks({tag: tag}))
            dispatch(updatePlannedByTasks({tag: tag}))
        }
        dispatch(removeFromSearchByOthers({tag: tag}))
        dispatch(updateSearchByOthers({tag: tag}))
        dispatch(removeFromListGroupByImportant({tag: tag}))
        dispatch(updateListGroupByImportant({tag: tag}))
    }

    function updateJSXonCheck(tag) {
        setCompletedJsxUpdate(completedJsxUpdate + 1)
        dispatch(addToUpdateCompletedTasks({tag: tag}))
        clearTimeout(timeOutId)
    }    
    
    function handleChange(id, audio) {
        const checkbox = document.getElementById('important-checkbox-' + id)
        if(checkbox.checked) {
            document.getElementById('important-task-name-' + id).classList.add('task-complete-underline')
            audio.play();
        }else {
            document.getElementById('important-task-name-' + id).classList.remove('task-complete-underline')
        }
    }

    function handleMouseOver(id) {
        for(var i = 1; i < importantList.length + 1; i++) {
            document.getElementById('important-main-list-remove-' + i) !== null &&
            document.getElementById('important-main-list-remove-' + i).classList.remove('extra-main-list-remove')
        }
        document.getElementById('important-main-list-remove-' + id) !== null &&
        document.getElementById('important-main-list-remove-' + id).classList.add('extra-main-list-remove')
    }

    function handleMouseOut(id) {
        document.getElementById('important-main-list-remove-' + id) !== null &&
        document.getElementById('important-main-list-remove-' + id).classList.remove('extra-main-list-remove')
    }

    return (
        
        <div className="container-fluid important-container" style={{padding: 42}}>
            <div className="d-flex flex-row align-items-center mb-4">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                style={{fill: "rgba(255, 255, 255, 1)"}}>
                    <path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 
                    18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 
                    1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 
                    8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 
                    .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 
                    2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 
                    0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z">
                    </path>
                </svg>
                <p className="important-title ms-3 mb-0">Important</p>
            </div>
            <div className="important-tasks-container">
                {important}
            </div>
            <div 
            id="important-image-main-container"
            className="container-fluid important-image-main-container py-5">
                <div 
                id="important-image-container"
                className="important-image-container position-relative text-center"
                >
                    <img 
                    alt=""
                    src="https://img.icons8.com/clouds/150/000000/reminders.png"
                    className="important-image"
                    />
                    <p className="important-image-content mt-3">Try starring some tasks to see them here.</p>
                </div>
            </div>
            <AddToImportantList />
        </div>
    )
}

export default Important
