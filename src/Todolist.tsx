import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"


export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}
type PropsType = {
  id: string
  title: string,
  tasks: Array<TaskType>, 
  filter: FilterValuesType,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string,todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean,todolistId: string) => void
  removeList: (todolistId: string) => void
}


export function ToDoList(props: PropsType) { 

  const [newTaskTitle, setNewTaskTitle] = useState("Learn React")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { setError(null); if (e.code === "Enter" && newTaskTitle.trim() !== "") { props.addTask(newTaskTitle.trim(), props.id); setNewTaskTitle("")}}
  const addTask = () => { if ( newTaskTitle.trim() !== "" ) {props.addTask(newTaskTitle, props.id); setNewTaskTitle("")} else {setError("Пустое поле?")} }
  const onAllClick = () => props.changeFilter("All", props.id)
  const onActiveClick = () => props.changeFilter("Active", props.id)
  const onComplitedClick = () => props.changeFilter("Complited", props.id)
  const removeList = () => props.removeList(props.id)

  return <div>
    <h3>{props.title} <button onClick={removeList}>DEL</button></h3>
    <div>
      <input value={newTaskTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}  className={error ? "error" : ""}/>
      <button onClick={addTask} >+</button>
     { error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {props.tasks.map( (t) => {
      const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
      return <li className={t.isDone ? "is-done" : ""} key={t.id}>
          <input type="checkbox" checked={t.isDone} onChange={onCheckboxChangeHandler}/>
          <span>{t.title}</span>
          <button onClick={() => { props.removeTask(t.id, props.id) }}>x</button>
        </li>})}
    </ul>
    <div>
      <button className= {props.filter == "All" ? "active-filter" : ""} onClick={onAllClick}>All</button>
      <button className= {props.filter == "Active" ? "active-filter" : ""} onClick={onActiveClick}>Active</button>
      <button className= {props.filter == "Complited" ? "active-filter" : ""} onClick={onComplitedClick}>Complited</button>
    </div>
  </div>
}
