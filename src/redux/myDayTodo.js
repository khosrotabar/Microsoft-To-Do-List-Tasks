import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const myDayTodo = createSlice({
    name: 'myDayTodo',
    initialState: [],
    reducers: {
        addToMyDayTodo: (state, action) => {
            const newMyDayTodo = {
                id: state.length + 1,
                name: action.payload.name,
                group: action.payload.group,
                completed: action.payload.completed,
                tag: action.payload.tag,
                audio: new Audio(mp3_file),
                important: action.payload.important
            }
            state.push(newMyDayTodo)
        },
        removeFromMyDay: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updateMyDay: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        removeFromMyDayByTasks: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        updateMyDayByTasks: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
        MyDaytoggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        MyDayToggleCompleteByTasks: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].completed = action.payload.completed
        },
        MyDayToggleImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].important = action.payload.important
        },
        MyDayToggleImportantByImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].important = action.payload.important
        },
    }
})

export const {
    addToMyDayTodo,
    removeFromMyDay,
    updateMyDay,
    MyDaytoggleComplete,
    removeFromMyDayByTasks,
    updateMyDayByTasks,
    MyDayToggleCompleteByTasks,
    MyDayToggleImportant,
    MyDayToggleImportantByImportant
} = myDayTodo.actions

export default myDayTodo.reducer