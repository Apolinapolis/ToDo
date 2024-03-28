import './App.css';
import { useReducer } from 'react';
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
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './State/todolist-reducer';
import { addTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer, toggleStatusTaskAC } from './State/tasks-reducer';

export type FilterValuesType = "All" | "Active" | "Complited";

export type ToDoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducer() {

  let todolistid1 = v1()
  let todolistid2 = v1()

  let [todolists, dispatchToListReducer] = useReducer(todolistsReducer, [
    { id: todolistid1, title: "What to learn", filter: "All" },
    { id: todolistid2, title: "What to do", filter: "All" }])

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  function addItem(title: string, todolistId: string) {
    const action = addTaskAC(todolistId, title)
    dispatchToTasksReducer(action)
  }

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(todolistId, id)
    dispatchToTasksReducer(action)
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTitleTaskAC(todolistId, id, newTitle)
    dispatchToTasksReducer(action)
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToListReducer(ChangeTodolistFilterAC(value, todolistId))
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = toggleStatusTaskAC(todolistId, taskId, isDone)
    dispatchToTasksReducer(action)
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    dispatchToListReducer(ChangeTodolistTitleAC(newTitle, id))
  }

  function removeList(todolistId: string) {
    dispatchToListReducer(RemoveTodolistAC(todolistId))
    dispatchToTasksReducer(RemoveTodolistAC(todolistId))
  }

  function addList(title: string) {
    const action = AddTodolistAC(title)
    dispatchToListReducer(action)
    dispatchToTasksReducer(action)
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

export default AppWithReducer;