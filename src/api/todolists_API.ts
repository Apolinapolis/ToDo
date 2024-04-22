import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {"API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236"}
})

export type todolistType = {
    id:string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description:string
    title:string
   // completed:boolean
    status: number
    priority:number
    startDate:string
    deadline:string
    id:string
    todoListId:string
    order: number
    addedDate:string
}

export type UpdateTaskType = {
    title: string
    description: string
   // completed: required(boolean)
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type payloadCreatorType = {
    title: string
    description: string
    status: 1 | 0
    priority: number
    startDate: string | null
    deadline: string | null
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

type getTaskResponse = {
    error: string | null
    totalCount: number
    item: TaskType
}

export const todolistsAPI = {

    getTodolist() {
        return instance.get<Array<todolistType>>('todo-lists')
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:todolistType}>>("todo-lists", {title: title})
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(id: string) {
        return instance.get<getTaskResponse>(`todo-lists/${id}/tasks`)
    },
    deleteTask(listID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${listID}/tasks/${taskID}`)
    },
    addTask(listID:string, payload: string) {
        return instance.post<ResponseType>(`todo-lists/${listID}/tasks`, {title: payload})
    },
    changeTaskName(listID: string, taskID: string, newTaskName: string) {

        const payloadCreator:payloadCreatorType = {

            title: newTaskName,
            description: "test",
            status: 0,
            priority: 1,
            startDate: "",
            deadline: null
        }
        return instance.put(`todo-lists/${listID}/tasks/${taskID}`, payloadCreator)
    }
}
// 63c391f7-1445-4181-a887-eb844e36029d
// 2236d384-48f0-4e51-9f62-9969af612405