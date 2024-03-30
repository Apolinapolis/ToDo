import { Checkbox, IconButton } from "@mui/material"
import React, { ChangeEvent, useCallback } from "react"
import { EditableSpan } from "./editableSpan"
import { Delete } from "@mui/icons-material"
import { TaskType } from "./Todolist"


export type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    todolistid: string
    task: TaskType
}


export const Task = React.memo((props: TaskPropsType) => {

    const onCheckboxChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => 
    { props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistid) }, [props.task.id, props.todolistid, props.changeTaskStatus])


    const onChangeTitleHandler = useCallback((newValue: string) => 
    { props.changeTaskTitle(props.task.id, newValue, props.todolistid) }, [])


    return <li className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
        <Checkbox defaultChecked color="success" checked={props.task.isDone} onChange={onCheckboxChangeHandler} />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton aria-label="delete" onClick={() => { props.removeTask(props.task.id, props.todolistid) }} size="small">
            <Delete />
        </IconButton>
    </li>

})