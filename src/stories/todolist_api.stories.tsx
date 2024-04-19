import {useEffect, useState} from "react";
import axios from "axios";
import {todolistsAPI} from "../api/todolists_API";


export default {title: "API"}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {"API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236"}
});

const settings = {
    withCredentials: true,
    headers: {"API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236"}
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Olga"})
    useEffect(() => {
        todolistsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "A New List"
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = "522e6ecf-6590-4ccb-89b6-39e8f5a68139"
        todolistsAPI.deleteTodolist(listId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = "07494cd3-7e72-48c3-84eb-7d56babcc150";
        const title = "I live Refactoring";
        todolistsAPI.updateTodolist(listId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listID = "2236d384-48f0-4e51-9f62-9969af612405"
        todolistsAPI.getTasks(listID)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}