import { ChangeEvent, KeyboardEvent, useState } from "react"

type addItemFormPropsType = {
    addItem: (title: string) => void
  }
  
 export function AddItemForm(props: addItemFormPropsType) {
  
    const [newTaskTitle, setNewTaskTitle] = useState("Learn React")
  
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }
  
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { 
      setError(null); if (e.code === "Enter" && newTaskTitle.trim() !== "") { props.addItem(newTaskTitle.trim()); setNewTaskTitle("")}}
  
    const [error, setError] = useState<string | null>(null)
  
    const addTask = () => { if ( newTaskTitle.trim() !== "" ) {props.addItem(newTaskTitle.trim()); setNewTaskTitle("")} else {setError("Пустое поле?")} }
    
  
    return <div>
      <input
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyUp={onKeyPressHandler}
        className={error ? "error" : ""} />
      <button
        onClick={addTask} >+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  }