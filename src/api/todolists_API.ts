import axios from "axios";

export type todolistType = {
    id:string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    // 2.18
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

type getTaskResponse = {
    error: string | null
    totalCount: number
}

const settings = {
    withCredentials: true,
    headers: {"API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236"}
}

export const todolistsAPI = {
    getTodolist() {
        const promise = axios.get<Array<todolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{item:todolistType}>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
        return promise
    },
    getTasks(id: string) {
        const promise = axios.get<any>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`, settings)
        return promise
    },


}