import { configureStore } from '@reduxjs/toolkit'
import sideListReducer from './sideList'
import myDayTodoReducer from './myDayTodo'
import importantListReducer from './importantTodo'
import plannedTodoReducer from './plannedTodo'
import tasksTodoReducer from './tasksTodo'
import listGroupTodoReducer from './listGroup'
import updateCompletedTasksReducer from './updateCompletedTasks'
import searchTodoReducer from './search'

const store = configureStore({
    reducer: {
        sideList: sideListReducer,
        myDayTodo: myDayTodoReducer,
        importantTodo: importantListReducer,
        plannedTodo: plannedTodoReducer,
        tasksTodo: tasksTodoReducer,
        listGroupTodo: listGroupTodoReducer,
        updateCompletedTasks: updateCompletedTasksReducer,
        searchTodo: searchTodoReducer
    }
})

export default store