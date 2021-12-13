import React, { useEffect, useState } from 'react'
import AddToListGroup from '../AddToListGroup/AddToListGroup'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromListGroup, updateListGroup, listGrouptoggleComplete,
    listGroupToggleImportant } from '../../redux/listGroup'
import { importantToggleCompleteByTasks, addToImportantTodo, removeFromImportantByTasks,
    updateImportantByTasks } from '../../redux/importantTodo'
import { addToUpdateCompletedTasks } from '../../redux/updateCompletedTasks'
import { seacrhtoggleCompleteByOthers, searchToggleImportantByOthers,
    removeFromSearchByOthers, updateSearchByOthers } from '../../redux/search'

export default function ListGroup(props) {
    const [listGroup, setListGroup] = useState('')
    const [completedJsxUpdate, setCompletedJsxUpdate] = useState(0)
    const [timeOutId, setTimeOutId] = useState('')
    const [listGroupCompleted, setListGroupCompleted] = useState('')
    const groupLists = useSelector((state) => state.listGroupTodo)
    const localString = useSelector((state) => state.updateCompletedTasks)
    const completedLength = groupLists.filter((todo) => todo.completed === true && todo.groupList === props.name).length
    const dispatch = useDispatch()

    useEffect(() => {
        if(completedLength !== 0) {
            document.getElementById('list-group-completed-collapse-btn').classList.add('extra-completed')
        }else {
            document.getElementById('list-group-completed-collapse-btn').classList.remove('extra-completed')
        }
    }, [completedLength !== 0])

    useEffect(() => {
        setListGroup(
            groupLists.map(item =>
                (item.groupList === props.name && item.completed === false) ? 
                <div 
                key={item.id}
                className="list-group-task-container px-3 py-3 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 list-group-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`list-group-checkbox-${item.id}`} 
                        onChange={
                            () => {
                                handleChange(item.id, item.audio); 
                                dispatch(listGrouptoggleComplete({id: item.id, completed: !item.completed}))
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
                        id={`list-group-task-name-${item.id}`}
                        className="list-group-task-name m-0" 
                        >
                            {item.name}
                        </p>
                        <p className="list-group-task-group m-0">{item.group}</p>
                    </div>
                    <svg  
                    id={`list-group-task-svg-${item.id}`}
                    className={`list-group-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24"
                    onClick={() => {
                        dispatch(listGroupToggleImportant({id: item.id, important: !item.important}))
                        dispatch(addToUpdateCompletedTasks({tag: item.tag}))
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !item.important}))
                        setTimeout(() => {handleImportant(item.tag, item.name, !item.important, item.completed, item.groupList)}, 10);
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
                    id={`listGroup-main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id)}
                    >
                        Remove
                    </button>
                </div> :
                null
            )
        )

        setListGroupCompleted(
            groupLists.map(item =>
                (item.groupList === props.name && item.completed === true) ? 
                <div 
                key={item.id}
                className="list-group-task-container px-3 py-3 d-flex flex-row align-items-center
                position-relative"
                onMouseOver={() => handleMouseOver(item.id)}
                onMouseOut={() => handleMouseOut(item.id)}
                >
                    <label className="me-3 list-group-task-inputCheck-container">
                        <input 
                        type="checkbox" 
                        id={`list-group-checkbox-${item.id}`} 
                        checked={item.completed}
                        onChange={
                            () => {
                                dispatch(listGrouptoggleComplete({id: item.id, completed: !item.completed}))
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
                        id={`list-group-task-name-${item.id}`}
                        className="list-group-task-name m-0" 
                        style={item.completed === true ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                        >
                            {item.name}
                        </p>
                        <p className="list-group-task-group m-0">{item.group}</p>
                    </div>
                    <svg  
                    id={`list-group-task-svg-${item.id}`}
                    className={`list-group-task-svg position-absolute ${item.important === true && 'extra-my-day-task-svg'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" viewBox="0 0 24 24" 
                    onClick={() => {
                        dispatch(listGroupToggleImportant({id: item.id, important: !item.important}))
                        dispatch(addToUpdateCompletedTasks({tag: item.tag}))
                        dispatch(searchToggleImportantByOthers({tag: item.tag, important: !item.important}))
                        setTimeout(() => {handleImportant(item.tag, item.name, !item.important, item.completed, item.groupList)}, 10);
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
                    id={`listGroup-main-list-remove-${item.id}`}
                    className="position-absolute main-list-remove"
                    onClick={() => handleTasksDelete(item.tag, item.id)}
                    >
                        Remove
                    </button>
                </div> :
                null
            )
        )
    }, [groupLists.length, props.name, completedJsxUpdate, localString.length])

    function handleImportant(tag, name, important, completed, groupList) {
        if(important === true) {
            dispatch(addToImportantTodo({
                name: name,
                group: `other tasks .  ${groupList}`,
                completed: completed,
                tag: tag,
                groupList: groupList,
                important: true
            }))
        }else {
            dispatch(removeFromImportantByTasks({tag: tag}))
            dispatch(updateImportantByTasks({tag: tag}))
        }
    }

    function handleTasksDelete(tag, id) {
        dispatch(removeFromListGroup({id: id})) 
        dispatch(updateListGroup({id: id}))
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

    function handleMouseOver(id) {
        for(var i = 1; i < groupLists.length + 1; i++) {
            document.getElementById('listGroup-main-list-remove-' + i) !== null &&
            document.getElementById('listGroup-main-list-remove-' + i).classList.remove('extra-main-list-remove')
        }
        document.getElementById('listGroup-main-list-remove-' + id) !== null &&
        document.getElementById('listGroup-main-list-remove-' + id).classList.add('extra-main-list-remove')
    }

    function handleMouseOut(id) {
        document.getElementById('listGroup-main-list-remove-' + id) !== null &&
        document.getElementById('listGroup-main-list-remove-' + id).classList.remove('extra-main-list-remove')
    }

    function handleChange(id, audio) {
        const checkbox = document.getElementById('list-group-checkbox-' + id)
        if(checkbox.checked) {
            document.getElementById('list-group-task-name-' + id).classList.add('task-complete-underline')
            audio.play();
        }else {
            document.getElementById('list-group-task-name-' + id).classList.remove('task-complete-underline')
        }
    }

    return (
        
        <div className="container-fluid list-group-container" style={{padding: 42}}>
            <div className="d-flex flex-row align-items-center mb-3">
                <p className="list-group-title ms-3 mb-0">{props.name}</p>
            </div>
            <div className="list-group-tasks-container">
                {listGroup}
                <button 
                type="button" 
                id="list-group-completed-collapse-btn"
                class="list-group-completed-collapse-btn" 
                data-bs-toggle="collapse" 
                data-bs-target="#listGroupDemo"
                >
                    <svg 
                    id="list-group-completed-svg"
                    className="list-group-completed-svg"
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
                <div id="listGroupDemo" class="collapse">
                    <div className="container-fluid" style={{height: 15}}></div>
                    { listGroupCompleted }
                </div>
            </div>
            <AddToListGroup groupName={props.name}/>
        </div>
    )
}
