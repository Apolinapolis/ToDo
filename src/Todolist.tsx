import { ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./addItemForm"
import { EditableSpan } from "./editableSpan"

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
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  removeList: (todolistId: string) => void
}


export function ToDoList(props: PropsType) {

  const onAllClick = () => props.changeFilter("All", props.id)
  const onActiveClick = () => props.changeFilter("Active", props.id)
  const onComplitedClick = () => props.changeFilter("Complited", props.id)
  const removeList = () => props.removeList(props.id)
  const addTask = (title: string) => { props.addTask(title, props.id) }
  const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle (props.id, newTitle) }

  return <div>
    <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} /><button onClick={removeList}>DEL</button></h3>
    <AddItemForm addItem={addTask} />
    <ul>
      {props.tasks.map((t) => {

        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(t.id, e.currentTarget.checked, props.id) }
        const onChangeTitleHandler = (newValue:string) => { props.changeTaskTitle(t.id, newValue, props.id) }

        return <li className={t.isDone ? "is-done" : ""} key={t.id}>
          <input type="checkbox" checked={t.isDone} onChange={onCheckboxChangeHandler} />
          <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
          <button onClick={() => { props.removeTask(t.id, props.id) }}>x</button>
        </li>
      })}

    </ul>
    <div>
      <button className={props.filter == "All" ? "active-filter" : ""} onClick={onAllClick}>All</button>
      <button className={props.filter == "Active" ? "active-filter" : ""} onClick={onActiveClick}>Active</button>
      <button className={props.filter == "Complited" ? "active-filter" : ""} onClick={onComplitedClick}>Complited</button>
    </div>
  </div>
}
