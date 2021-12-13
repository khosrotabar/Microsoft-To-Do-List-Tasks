import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const tasksTodo = createSlice({
    name: 'tasksTodo',
    initialState: [],
    reducers: {
        addToTasksTodo: (state, action) => {
            const newTasksTodo = {
                id: state.length + 1,
                name: action.payload.name,
                group: action.payload.group,
                completed: action.payload.completed,
                tag: action.payload.tag,
                audio: new Audio(mp3_file),
                groupList: action.payload.groupList,
                important: action.payload.important
            }
            state.push(newTasksTodo)
        },
        removeFromTasks: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updateTasks: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        removeFromTasksByOthers: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        updateTasksByOthers: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
        tasksToggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        tasksToggleCompleteByOthers: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].completed = action.payload.completed
        },
        tasksToggleImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].important = action.payload.important
        },
        tasksToggleImportantByImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].important = action.payload.important
        },
    }
})

export const {
    addToTasksTodo,
    removeFromTasks,
    updateTasks,
    tasksToggleComplete,
    removeFromTasksByOthers,
    updateTasksByOthers,
    tasksToggleCompleteByOthers,
    tasksToggleImportant,
    tasksToggleImportantByImportant
} = tasksTodo.actions

export default tasksTodo.reducer