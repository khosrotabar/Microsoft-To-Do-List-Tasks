import { createSlice } from '@reduxjs/toolkit'

const sideList = createSlice({
    name: 'sideList',
    initialState: [],
    reducers: {
        addToSideList: (state, action) => {
            const newSideList = {
                id: state.length + 1,
                name: action.payload.name
            }
            state.push(newSideList)
        },
        removeFromSideList: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id )
        },
        updateSideList: (state, action) => {
            state.map(item => {
                if(item.id > action.payload.id) {
                    item.id -= 1
                }
                return item
            })
        }
    }
})

export const { 
    addToSideList,
    removeFromSideList,
    updateSideList
} = sideList.actions

export default sideList.reducer