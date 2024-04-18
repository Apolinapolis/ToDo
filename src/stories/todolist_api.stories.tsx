import {useEffect, useState} from "react";
import axios from "axios";


export default {title: "API"}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://social-network.samuraijs.com/api/1.1/',
    headers:     {
        "API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236"
    }
});

const settings = {
    withCredentials: true,
    headers: { "API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236" }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Olga"})
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",{title:"superBomba"}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>("null")
    useEffect(() => {
        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/?id",{title:"bom"}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}