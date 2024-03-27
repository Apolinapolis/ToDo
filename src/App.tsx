import './App.css';
import { useState } from 'react';
import { TaskType, ToDoList } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';

export type FilterValuesType = "All" | "Active" | "Complited";

export type ToDoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
function App() {

  let todolistid1 = v1()
  let todolistid2 = v1()

  let [todolists, setTodolists] = useState<Array<ToDoListType>>([
    { id: todolistid1, title: "What to learn", filter: "All" },
    { id: todolistid2, title: "What to do", filter: "All" }])

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistid1]: [
      { id: v1(), title: "2x React", isDone: true },
      { id: v1(), title: "2x Resume", isDone: true },
      { id: v1(), title: "Sport", isDone: true },
      { id: v1(), title: "Codewars", isDone: false },
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Yoga", isDone: false },
    ],
    [todolistid2]: [
      { id: v1(), title: "RUN", isDone: true },
      { id: v1(), title: "SWIM", isDone: false },
    ]
  })

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) { todolist.filter = value; setTodolists([...todolists]) }
  }

  function addItem(title: string, todolistId: string) {
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

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(t => t.id === id)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  function removeList(todolistId: string) {
    let filteredLists = todolists.filter(t => t.id !== todolistId)
    setTodolists(filteredLists)
    delete tasksObj[todolistId]
  }

  function addList(title: string) {
    let newTodolistID = v1()
    let newTodolist: ToDoListType = { id: newTodolistID , title, filter: "All" }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasksObj, [newTodolistID]: [] }) // mb todolistid.id
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    // достаем нужный массив по todolist
    let tasks = tasksObj[todolistId]
    // достаем нужную туску
    let task = tasks.find(t => t.id === id)
    // меняю таску, если она нашлась
    if (task) task.title = newTitle; setTasks({ ...tasksObj })
  }


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm addItem={addList} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];
            if (tl.filter === "Complited") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone) }
            if (tl.filter === "Active") { tasksForTodolist = tasksForTodolist.filter(t => !t.isDone) }
            return <Grid item>
              <Paper style={{ padding: "10px" }}>
                <ToDoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addItem}
                  changeTaskStatus={changeTaskStatus}
                  filter={tl.filter}
                  removeList={removeList}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle} />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default App;