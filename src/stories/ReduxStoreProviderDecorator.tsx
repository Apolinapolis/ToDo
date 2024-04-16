import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../State/todolist-reducer";
import {tasksReducer} from "../State/tasks-reducer";
import {v1} from "uuid";


const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: "testIdOne", title: "start list", filter:"all" },
        {id: "testIdTwo", title: "next list", filter:"all" }
    ],
    tasks: {
        ["testIdOne"]:[
            { id: v1(), title: "2x Resume", isDone: false },
            { id: v1(), title: "Sport", isDone: true },
        ],
        ["testIdTwo"]:[
            { id: v1(), title: "yoga", isDone: true },
            { id: v1(), title: "meditation", isDone: false },
        ],
    }
}

// @ts-ignore
export const storyBookStore = createStore(rootReduser, initialGlobalState )

export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}