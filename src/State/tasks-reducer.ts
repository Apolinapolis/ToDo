import { TasksStateType } from "../App"
import { ADD_TODOLISTactionType, REMOVE_TODOLISTactionType, todolistid1 } from "./todolist-reducer";
import { v1 } from 'uuid';


export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    listId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD_TASK"
    listId: string
    title: string
}
export type tooglingStatusType = {
    type: "TOOGLING"
    listId: string
    taskId: string
    toggling: boolean
}
export type changeTitleTaskType = {
    type: "CHANGE_TITLE"
    listId: string
    taskId: string
    title: string
}

type ActionsType = AddTaskActionType | RemoveTaskActionType | tooglingStatusType 
| changeTitleTaskType | ADD_TODOLISTactionType | REMOVE_TODOLISTactionType

const initialState:TasksStateType = {
    [todolistid1]: [
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Sport", isDone: false },
      { id: v1(), title: "CV", isDone: false },
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "CodeWars", isDone: false },
      { id: v1(), title: "Yoga", isDone: false },
    ]
  }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":{
            const stateCopy = { ...state }
            const tasks = stateCopy[action.listId]
            const filteredTasks = tasks.filter(el => el.id != action.taskId)
            stateCopy[action.listId] = filteredTasks
            return stateCopy}

        case "ADD_TASK":{
            const stateCopy = { ...state }
            const currentListCopy = stateCopy[action.listId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...currentListCopy] //currentListCopy.unshift(newTask) 
            stateCopy[action.listId] = newTasks       
            return stateCopy}

        case "TOOGLING": {
            let tasks = state[action.listId]
            state[action.listId] = tasks.map( t => 
                t.id === action.taskId 
                ? {...t, isDone: action.toggling}
                : t )
            return {...state}
        }
        case "CHANGE_TITLE": {
            let tasks = state[action.listId]
            state[action.listId] = tasks.map( t => 
                t.id === action.taskId 
                ? {...t, title: action.title}
                : t )
            return {...state}
        }
        case "ADD_TODOLIST": { 
            const stateCopy = { ...state }
            stateCopy[action.id] = []
            return stateCopy
        }

        case "REMOVE_TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        default: return state
}
}


export const removeTaskAC = (listId: string, taskId: string): RemoveTaskActionType => {
    return { type: "REMOVE_TASK", listId, taskId }
}
export const addTaskAC = (listId: string, title: string ): AddTaskActionType => {
    return { type: "ADD_TASK", listId, title }
}
export const toggleStatusTaskAC = (listId: string, taskId: string, toggling: boolean ): tooglingStatusType => {
    return { type: "TOOGLING", listId, taskId, toggling }
}
export const changeTitleTaskAC = (listId: string, taskId: string, title: string ): changeTitleTaskType => {
    return { type: "CHANGE_TITLE", listId, taskId, title }
}