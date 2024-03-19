import './App.css';
import { useState } from 'react';
import { ToDoList } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "All" | "Active" | "Complited";

type ToDoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}
function App() {

  let todolistid1 = v1()
  let todolistid2 = v1()

  let [todolists, setTodolists] = useState<Array<ToDoListType>>([
    { id: todolistid1, title: "What to learn", filter: "Active" },
    { id: todolistid2, title: "What to do", filter: "All" }])


  let [tasksObj, setTasks] = useState({
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
    if (todolist) { todolist.filter = value; setTodolists([...todolists]) }
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) task.isDone = isDone; setTasks({ ...tasksObj })
  }

  function removeList(todolistId: string) {
    let filteredLists = todolists.filter(t => t.id !== todolistId) 
    setTodolists(filteredLists)
    delete tasksObj[todolistId]
  }


  return (

    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];
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
          filter={tl.filter}
          removeList={removeList} />
      })}
    </div>
  )
}

export default App;