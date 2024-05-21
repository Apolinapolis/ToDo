import {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists_API";


export default {title: "API"}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "initial state"})
    useEffect(() => {
        todolistsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [targetID, setID] = useState<any>(null)

    const deleteList = () => {
        todolistsAPI.deleteTodolist(targetID)
            .then( e => alert(e.data.resultCode) )
    }

    return <div>
        <input placeholder={"id"} onChange={e => setID(e.currentTarget.value)} value={targetID}/>
        <button onClick={deleteList}> Delete </button>
    </div>
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
    const [state, setState] = useState<any>("Запрос списка задач")
    useEffect(() => {
        const listID = "2236d384-48f0-4e51-9f62-9969af612405"
        todolistsAPI.getTasks(listID)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>("initial")
    const [listID, setlistID] = useState<any>(null)
    const [taskID, setTaskID] = useState<any>(null)

    const deleteTask = () => {
        todolistsAPI.deleteTask(listID, taskID)
            .then((res) => {
                setState(res.data.resultCode)
            })
    };
    return <div> <p>{state == 0 ? "Успешно удалено": `resultCode: ${state}`}</p>
        <div>
            <input placeholder={"listID"} value={listID} onChange={ e => setlistID(e.currentTarget.value)}/>
            <input placeholder={"taskID"} value={taskID} onChange={ e => setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask} >Delete</button></div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [listID, setlistID] = useState<any>(null)
    const [title, setTitle] = useState<any>("example initial state")

    const createTask = () => {

        todolistsAPI.addTask(listID, title)
            .then((res) => {
                setState(res.data.resultCode)
            })
    }

    return <div> <p>{state == 0 && "Задача добавлена"}</p>
    <input placeholder={"title"} value={title} onChange={ e => setTitle(e.currentTarget.value) }/>
    <input placeholder={"id"} value={listID} onChange={ e => setlistID(e.currentTarget.value) }/>
        <button onClick={createTask}> Create </button>
    </div>
}

export const UpdateTask = () => {
    const [newTitle, setTitle] = useState<any>(null)
    const [listID, setlistID] = useState<any>(null)
    const [taskID, setTaskID] = useState<any>(null)
    const [response, setResponse] = useState<any>(null)



    const updateTask = () => {
        todolistsAPI.changeTaskName(listID, taskID, newTitle)
            .then( res => setResponse(res.data) )
    }
    return <div> <p> {response ? JSON.stringify(response) : "empty" }</p>
        <input placeholder={"new title"} value={newTitle} onChange={ e => setTitle(e.currentTarget.value) }/>
        <input placeholder={"list ID"} value={listID} onChange={ e => setlistID(e.currentTarget.value) }/>
        <input placeholder={"TASK ID"} value={taskID} onChange={ e => setTaskID(e.currentTarget.value) }/>
        <button onClick={updateTask}> Rename Task </button>
    </div>
}