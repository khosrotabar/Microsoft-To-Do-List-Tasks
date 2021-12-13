import { createSlice } from '@reduxjs/toolkit'
import mp3_file from '../checkbox-sound.mp3'

const searchTodo = createSlice({
    name: 'searchTodo',
    initialState: [],
    reducers: {
        addSearchTodo: (state, action) => {
            const newSearchTodo = {
                id: state.length + 1,
                name: action.payload.name,
                group: action.payload.group,
                completed: action.payload.completed,
                tag: action.payload.tag,
                audio: new Audio(mp3_file),
                important: action.payload.important,
                groupList: action.payload.groupList,
                display: action.payload.display
            }
            state.push(newSearchTodo)
        },
        searchTodoName: (state, action) => {
            state.map((todo) =>
                 (todo.name.search(`${action.payload.name}`) !== -1 && action.payload.name !== '') ?
                 (todo.display = true) : (todo.display = false)
            )
        },
        seacrhtoggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        seacrhtoggleCompleteByOthers: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].completed = action.payload.completed
        },
        searchToggleImportant: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].important = action.payload.important
        },
        searchToggleImportantByOthers: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.tag === action.payload.tag
            );
            state[index].important = action.payload.important
        },
        removeFromSearch: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updateSearch: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        },
        removeFromSearchByOthers: (state, action) => {
            return state.filter((item) => item.tag !== action.payload.tag )
        },
        updateSearchByOthers: (state, action) => {
            state.map(item => {
                if(item.tag > action.payload.tag) {
                    item.id -= 1
                }
                return item
            })
        },
    }
})

export const {
    addSearchTodo,
    searchTodoName,
    seacrhtoggleComplete,
    searchToggleImportant,
    removeFromSearch,
    updateSearch,
    seacrhtoggleCompleteByOthers,
    searchToggleImportantByOthers,
    removeFromSearchByOthers,
    updateSearchByOthers
} = searchTodo.actions

export default searchTodo.reducer