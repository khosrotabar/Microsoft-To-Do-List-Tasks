import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const plannedTodo = createSlice({
    name: 'plannedTodo',
    initialState: [],
    reducers: {
        addToPlannedTodo: (state, action) => {
            const newPlannedTodo = {
                id: state.length + 1,
                name: action.payload.name,
                group: action.payload.group,
                completed: action.payload.completed,
                audio: new Audio(mp3_file),
                tag: action.payload.tag,
                groupList: action.payload.groupList,
                important: action.payload.important
            }
            state.push(newPlannedTodo)
        },
        removeFromPlanned: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updatePlanned: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        removeFromPlannedByTasks: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        updatePlannedByTasks: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
        plannedToggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        plannedToggleCompleteByTasks: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].completed = action.payload.completed
        },
        plannedToggleImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].important = action.payload.important
        },
        plannedToggleImportantByImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].important = action.payload.important
        },
    }
})

export const {
    addToPlannedTodo,
    removeFromPlanned,
    updatePlanned,
    plannedToggleComplete,
    removeFromPlannedByTasks,
    updatePlannedByTasks,
    plannedToggleCompleteByTasks,
    plannedToggleImportant,
    plannedToggleImportantByImportant
} = plannedTodo.actions

export default plannedTodo.reducer