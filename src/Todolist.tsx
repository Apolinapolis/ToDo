import React, { useCallback } from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./addItemForm"
import { EditableSpan } from "./editableSpan"
import { Button, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { Task } from "./Task"


type PropsType = {
  id: string
  title: string,
  tasks: Array<TaskType>,
  filter: FilterValuesType,
  removeList: (todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void

  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

export const ToDoList = React.memo((props: PropsType) => {
  
  const onAllClick = useCallback(() => props.changeFilter("All", props.id), [props.id, props.changeFilter])
  const onActiveClick = useCallback(() => props.changeFilter("Active", props.id), [props.id, props.changeFilter])
  const onComplitedClick = useCallback(() => props.changeFilter("Complited", props.id), [props.id, props.changeFilter])

  const removeList = () => props.removeList(props.id)
  const addTask = useCallback((title: string) => { props.addTask(title, props.id) }, [])
  const changeTodolistTitle = useCallback((newTitle: string) => { props.changeTodolistTitle(props.id, newTitle) }, [])

  let tasksForTodolist = props.tasks
  if (props.filter === "Active") { 
    tasksForTodolist = props.tasks.filter(t => t.isDone === false) }
  if (props.filter === "Complited") { 
    tasksForTodolist = props.tasks.filter(t => t.isDone === true) }
  

  return <div>
    <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      <IconButton aria-label="delete" onClick={removeList} size="small">
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <ul>
      {tasksForTodolist.map( t => <Task
          key={t.id}
          todolistid={props.id}
          task={t}
          changeTaskStatus={props.changeTaskStatus}
          changeTaskTitle={props.changeTaskTitle}
          removeTask={props.removeTask}
        />
      )}
    </ul>
    <div>
      <Button onClick={onAllClick} color="secondary" variant={props.filter == "All" ? "contained" : "outlined"} size="small">All</Button>
      <Button onClick={onActiveClick} color="secondary" variant={props.filter == "Active" ? "contained" : "outlined"} size="small">Active</Button>
      <Button onClick={onComplitedClick} color="secondary" variant={props.filter == "Complited" ? "contained" : "outlined"} size="small">Complited</Button>
    </div>
  </div>
})


