import './App.css';
import { TaskType, ToDoList } from './Todolist';
import { AddItemForm } from './addItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './State/todolist-reducer';
import { addTaskAC, changeTitleTaskAC, removeTaskAC, toggleStatusTaskAC } from './State/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './State/store';
import { useCallback } from 'react';





export type FilterValuesType = "All" | "Active" | "Complited";

export type ToDoListType = {
  id: string,
  title: string,
  filter: FilterValuesType,
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


 function AppWithRedux() {
    
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<ToDoListType>>( state => state.todolists )
  const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )

  const addItem = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(todolistId, title))
  }, [dispatch] )

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(todolistId, id))
  }, [dispatch] )

  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTitleTaskAC(todolistId, id, newTitle))
  }, [dispatch] )

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(ChangeTodolistFilterAC(value, todolistId))
  }, [dispatch] )

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(toggleStatusTaskAC(todolistId, taskId, isDone))
  }, [dispatch] )

  const changeTodolistTitle = useCallback( (id: string, newTitle: string) => {
    dispatch(ChangeTodolistTitleAC(newTitle, id))
  }, [dispatch] )

  const removeList = useCallback( (todolistId: string) => {
    dispatch(RemoveTodolistAC(todolistId))
  }, [dispatch] )

  const addList = useCallback( (title: string) => {
    dispatch(AddTodolistAC(title))
  }, [dispatch] )

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
              Legendary Tasks
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
            return <Grid item>
              <Paper style={{ padding: "10px" }}>
                <ToDoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasks[tl.id]}
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

export default AppWithRedux