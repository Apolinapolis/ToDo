import { combineReducers, createStore } from 'redux'
import { todolistsReducer } from './todolist-reducer'
import { tasksReducer } from './tasks-reducer'


export type AppRootState = ReturnType<typeof rootReduser>

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReduser)

//@ts-ignore
window.store = store