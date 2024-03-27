import { TasksStateType } from "../App"
import { ADD_TODOLISTactionType, REMOVE_TODOLISTactionType } from "./todolist-reducer";
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


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":{
            const stateCopy = { ...state }
            const tasks = state[action.listId]
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
            const stateCopy = { ...state }
            const tasks = stateCopy[action.listId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {task.isDone = action.toggling }
            return stateCopy
        }
        case "CHANGE_TITLE": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.listId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {task.title = action.title }
            return stateCopy
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
        default: throw new Error("undefined type")
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