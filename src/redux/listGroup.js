import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const listGroupTodo = createSlice({
    name: 'listGroupTodo',
    initialState: [],
    reducers: {
        addToListGroupTodo: (state, action) => {
            const newListGroupTodo = {
                id: state.length + 1,
                name: action.payload.name,
                audio: new Audio(mp3_file),
                completed: action.payload.completed,
                groupList: action.payload.groupList,
                important: action.payload.important,
                tag: action.payload.tag
            }
            state.push(newListGroupTodo)
        },
        removeFromListGroup: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        removeFromListGroupByImportant: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        removeFromListGroupTotal: (state, action) => {
            return state.filter((item) => item.groupList !== action.payload.groupList )
        },
        updateListGroup: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        updateListGroupByApp: (state, action) => {
            for(var i = 0; i < state.length; i++) {
                state[i].id = i + 1
            }
        },
        updateListGroupByImportant: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
        listGrouptoggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        listGrouptoggleCompleteByImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            )
            if(state[index] !== undefined) {
                state[index].important = action.payload.important
            }
        },
        listGroupToggleImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].important = action.payload.important
        },
        listGroupToggleImportantByImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            if(state[index] !== undefined) {
                state[index].important = action.payload.important
            }
        },
    }
})

export const {
    addToListGroupTodo,
    removeFromListGroup,
    removeFromListGroupTotal,
    updateListGroup,
    listGrouptoggleComplete,
    listGroupToggleImportant,
    listGroupToggleImportantByImportant,
    removeFromListGroupByImportant,
    updateListGroupByImportant,
    updateListGroupByApp,
    listGrouptoggleCompleteByImportant
} = listGroupTodo.actions

export default listGroupTodo.reducer