import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"


type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    let activateEditMode = () => {setEditMode(true); setTitle(props.title)}
    let activateViewMode = () => {setEditMode(false); props.onChange(title)}
    let onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
   
    ? <TextField
    autoFocus
    label="Замена" variant="standard" size="small" 
     value={title}
     onBlur={activateViewMode}
     onKeyDown={ e => e.code === "Enter" ? activateViewMode : null }
     onChange={onChangeTitleHandler} />
    : <span onDoubleClick={activateEditMode} >{props.title}</span>
}