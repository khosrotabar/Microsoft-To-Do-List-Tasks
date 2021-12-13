import { createSlice } from '@reduxjs/toolkit'

const updateCompletedTasks = createSlice({
    name: 'updateCompletedTasks',
    initialState: [],
    reducers: {
        addToUpdateCompletedTasks: (state, action) => {
            const newUpdateCompletedTasks = {
                tag: action.payload.tag
            }
            state.push(newUpdateCompletedTasks)
        }
    }
})

export const {
    addToUpdateCompletedTasks
} = updateCompletedTasks.actions

export default updateCompletedTasks.reducer