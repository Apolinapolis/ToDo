import { v1 } from 'uuid';
import { FilterValuesType, ToDoListType } from "../App" 
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from "./todolist-reducer";

test("todolist should be added", () => {
    let idOne = v1()
    let idTwo = v1()

    const newtodolistTitle = "New To Do List"

    const startState: Array<ToDoListType> = [
        { id: idOne, title: "What to learn", filter: "All" },
        { id: idTwo, title: "What to do", filter: "All" }
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newtodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newtodolistTitle)
})

test("todolist should be removed", () => {
    let idOne = v1()
    let idTwo = v1()

    const startState: Array<ToDoListType> = [
        { id: idOne, title: "What to learn", filter: "All" },
        { id: idTwo, title: "What to do", filter: "All" }
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(idTwo))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(idOne)

})

test("correct todolist shoult change title", () => {
    let idOne = v1()
    let idTwo = v1()

    const newtodolistTitle = "New To Do List"

    const startState: Array<ToDoListType> = [
        { id: idOne, title: "What to learn", filter: "All" },
        { id: idTwo, title: "What to do", filter: "All" }
    ]

    const action = ChangeTodolistTitleAC( newtodolistTitle, idTwo)
    const endState = todolistsReducer(startState, action)

    expect(endState[1].title).toBe(newtodolistTitle)
    expect(endState[0].title).toBe("What to learn")
}) 

test("filter of todolist should be changed", () => {
    let idOne = v1()
    let idTwo = v1()

    const newFilter: FilterValuesType = "Complited"

    const startState: Array<ToDoListType> = [
        { id: idOne, title: "What to learn", filter: "All" },
        { id: idTwo, title: "What to do", filter: "All" }
    ]

    const action = ChangeTodolistFilterAC(newFilter, idTwo)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe(newFilter)
}) 