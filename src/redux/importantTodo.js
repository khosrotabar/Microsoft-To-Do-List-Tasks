import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const importantTodo = createSlice({
    name: 'importantTodo',
    initialState: [],
    reducers: {
        addToImportantTodo: (state, action) => {
            const newImportantTodo = {
                id: state.length + 1,
                name: action.payload.name,
                group: action.payload.group,
                completed: action.payload.completed,
                tag: action.payload.tag,
                audio: new Audio(mp3_file),
                important: action.payload.important,
                groupList: action.payload.groupList
            }
            state.push(newImportantTodo)
        },
        removeFromImportant: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updateImportant: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        updateImportantByApp: (state, action) => {
            for(var i = 0; i < state.length; i++) {
                state[i].id = i + 1
            }
        },
        removeFromImportantByTasks: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        removeFromImportantTotal: (state, action) => {
            return state.filter((item) => item.groupList !== action.payload.groupList )
        },
        updateImportantByTasks: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
        importantToggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        importantToggleCompleteByTasks: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].completed = action.payload.completed
        },
    }
})

export const {
    addToImportantTodo,
    removeFromImportant,
    updateImportant,
    importantToggleComplete,
    removeFromImportantByTasks,
    updateImportantByTasks,
    importantToggleCompleteByTasks,
    removeFromImportantTotal,
    updateImportantByApp
} = importantTodo.actions

export default importantTodo.reducer