import { IconButton, TextField } from "@mui/material"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import AddTaskIcon from '@mui/icons-material/AddTask';

type addItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: addItemFormPropsType) => {

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(e.currentTarget.value) }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null); 
    if (e.code === "Enter" && newTaskTitle.trim() !== "") { props.addItem(newTaskTitle.trim()); 
    setNewTaskTitle("") }
  }

  const [error, setError] = useState<string | null>(null)

  const addTask = () => { if (newTaskTitle.trim() !== "") { props.addItem(newTaskTitle.trim()); setNewTaskTitle("") } else { setError("empty field") } }

  return <div>
    <TextField 
      label="Title" 
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
})