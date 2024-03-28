import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, createStore } from 'redux'
import { todolistsReducer } from './todolist-reducer'
import { tasksReducer } from './tasks-reducer'


/* type AppRootState = {
    todolists: Array<ToDoListType>
    tasks: TasksStateType
} */

//const store = configureStore(rootReduser)

export type AppRootState = ReturnType<typeof rootReduser>

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReduser)

//@ts-ignore
window.store = store