import { action } from '@storybook/addon-actions';
import {Task} from "../Task";
import React from "react";

export default {
    title: "task component",
    component: Task,
}

const changeTaskStatusCallback  = action("Status changed")
const changeTaskTitleCallback  = action("Title changed")
const removeTaskCallback  = action("task was removed")

export const TaskBaseExample = () => {return (<div>
    <Task
    task={{ id:"1", isDone: true, title: "First Task" }}
    todolistid={"todolistId1"}
    changeTaskStatus={changeTaskStatusCallback}
    changeTaskTitle={changeTaskTitleCallback}
    removeTask={removeTaskCallback}/>
    <Task
        task={{ id:"2", isDone: false, title: "Second Task" }}
        todolistid={"todolistId2"}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}/>
</div>)}

