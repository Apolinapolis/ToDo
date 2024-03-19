import './App.css';
import { useState } from 'react';
import { ToDoList } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "All" | "Active" | "Complited";

type ToDoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}
function App() {

/*   let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "2x React", isDone: true },
    { id: v1(), title: "2x Resume", isDone: true },
    { id: v1(), title: "Sport", isDone: true },
    { id: v1(), title: "Codewars", isDone: false },
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Yoga", isDone: false },
  ]) */

  //let [filter, setFilter] = useState<FilterValuesType>("All")

  let todolistid1 = v1()
  let todolistid2 = v1()

  let [tasks, setTasks] = useState({
    [todolistid1]: [
    { id: v1(), title: "2x React", isDone: true },
    { id: v1(), title: "2x Resume", isDone: true },
    { id: v1(), title: "Sport", isDone: true },
    { id: v1(), title: "Codewars", isDone: false },
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Yoga", isDone: false },
  ],
    [todolistid2]: [
    { id: v1(), title: "sex", isDone: true },
    { id: v1(), title: "ganja", isDone: false },
  ]
  })

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {todolist.filter = value; setTodolists([...todolists])}
  }

  function addTask(title: string, todolistId: string) {
    let taskS = tasks[todolistId]
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...taskS]
    tasks[todolistId] = newTasks
    setTasks({...tasks})
  }

  function removeTask(id: string, todolistId: string) {
    let taskS = tasks[todolistId]
    let filteredTasks = taskS.filter(t => t.id !== id)
    tasks[todolistId] = filteredTasks
    setTasks({...tasks})
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    let taskS = tasks[todolistId]
    let task = taskS.find( t => t.id === taskId )
    if (task) task.isDone = isDone; setTasks({...tasks})
  }

  let [todolists, setTodolists] = useState<Array<ToDoListType>>([
  {id: todolistid1, title: "What to learn", filter: "Active"},
  {id: todolistid2, title: "What to do", filter: "All"}])

  return (
    
    <div className="App">
      {todolists.map( (tl) => {
          let tasksForTodolist = tasks[tl.id];
          if (tl.filter === "Complited") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone) }
          if (tl.filter === "Active") { tasksForTodolist = tasksForTodolist.filter(t => !t.isDone) }
       return <ToDoList 
        key={tl.id}
        id={tl.id}
        title={tl.title}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter = {tl.filter} />})}
    </div>
  )
}

export default App;