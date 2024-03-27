import { TasksStateType, ToDoListType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { AddTodolistAC, todolistsReducer } from "./todolist-reducer"


test("id should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState:Array<ToDoListType> = []

    const action = AddTodolistAC("new todolist")

    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)
    const endTodolistsState:Array<ToDoListType> = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})