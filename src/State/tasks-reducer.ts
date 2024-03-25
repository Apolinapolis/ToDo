import { TasksStateType } from "../App"


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

type ActionsType = AddTaskActionType | RemoveTaskActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            const stateCopy = { ...state }
            const tasks = state[action.listId]
            const filteredTasks = tasks.filter(el => el.id != action.taskId)
            stateCopy[action.listId] = filteredTasks
            return stateCopy
        case "ADD_TASK":
            
            return { ...state }
    }
}



export const removeTaskAC = (listId: string, taskId: string): RemoveTaskActionType => {
    return { type: "REMOVE_TASK", listId, taskId }
}
export const addTaskAC = (listId: string, title: string ): AddTaskActionType => {
    return { type: "ADD_TASK", listId, title }
}