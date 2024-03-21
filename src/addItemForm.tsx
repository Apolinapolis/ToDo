import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddTaskIcon from '@mui/icons-material/AddTask';

type addItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: addItemFormPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("Learn React")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null); if (e.code === "Enter" && newTaskTitle.trim() !== "") { props.addItem(newTaskTitle.trim()); setNewTaskTitle("") }
  }

  const [error, setError] = useState<string | null>(null)

  const addTask = () => { if (newTaskTitle.trim() !== "") { props.addItem(newTaskTitle.trim()); setNewTaskTitle("") } else { setError("empty field") } }

  return <div>
    <TextField 
      label="Задача" 
      variant="standard" 
      size="small" 
      error={!!error} 
      helperText={error}
      value={newTaskTitle}
      onChange={onChangeHandler}
      onKeyUp={onKeyPressHandler} />
      <IconButton 
      onClick={addTask} 
      size="small" 
      color="secondary">
        <AddTaskIcon />
      </IconButton>
  </div>
}