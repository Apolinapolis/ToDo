import { TasksStateType } from "../App"
import { tasksReducer, removeTaskAC, addTaskAC, toggleStatusTaskAC, changeTitleTaskAC } from "./tasks-reducer"
import { AddTodolistAC, RemoveTodolistAC } from "./todolist-reducer"



test("correct task should be delete from tasks array", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },

          ],
          "todolistid2": [
            { id: "4", title: "RUN", isDone: true },
            { id: "5", title: "SWIM", isDone: false },
            { id: "6", title: "Fly", isDone: true },
          ]
    }

    const action = removeTaskAC ("todolistid2", "5")
    const endState = tasksReducer( startState, action )

    expect(endState["todolistid1"].length).toBe(3)
    expect(endState["todolistid2"].length).toBe(2)
    expect(endState["todolistid2"].every(el => el.id != "5")).toBeTruthy()
})


test("new task should be added into correct tasks array", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },

          ],
          "todolistid2": [
            { id: "4", title: "RUN", isDone: true },
            { id: "5", title: "SWIM", isDone: false },
            { id: "6", title: "Fly", isDone: true },
          ]
    }

    const action = addTaskAC ("todolistid1", "NEW_Title")
    const endState = tasksReducer( startState, action )

    expect(endState["todolistid1"].length).toBe(4)
    expect(endState["todolistid1"][0].id).toBeDefined()
    expect(endState["todolistid1"][0].title).toBe("NEW_Title")
    expect(endState["todolistid2"].length).toBe(3)
})


test("status of target task should be channged", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },

          ],
          "todolistid2": [
            { id: "1", title: "RUN", isDone: true },
            { id: "2", title: "SWIM", isDone: false },
            { id: "3", title: "Fly", isDone: true },
          ]
    }

    const action = toggleStatusTaskAC ("todolistid1", "2", false)
    const endState = tasksReducer( startState, action )

    expect(endState["todolistid1"].length).toBe(3)
    expect(endState["todolistid1"][1].isDone).toBeFalsy()
    expect(endState["todolistid2"][1].isDone).toBeFalsy()
    expect(endState["todolistid1"][2].isDone).toBeTruthy()
})


test("title of target task should be channged", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },

          ],
          "todolistid2": [
            { id: "1", title: "RUN", isDone: true },
            { id: "2", title: "SWIM", isDone: false },
            { id: "3", title: "Fly", isDone: true },
          ]
    }

    const action = changeTitleTaskAC ("todolistid1", "3", "SMOKE")
    const endState = tasksReducer( startState, action )

    expect(endState["todolistid1"][2].title).toBe("SMOKE")
    expect(endState["todolistid2"][2].title).toBe("Fly")
})


test("new array should be added when new todolist is added", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },
          ],
          "todolistid2": [
            { id: "1", title: "RUN", isDone: true },
            { id: "2", title: "SWIM", isDone: false },
            { id: "3", title: "Fly", isDone: true },
          ],
    }

    const action = AddTodolistAC ("new todolist title")
    const endState = tasksReducer( startState, action )

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistid1" && k != "todolistid2")
    if (!newKey) {throw new Error("expected add new todolist")}

    expect(keys.length).toBe(3)

    expect(endState[newKey]).toStrictEqual([])
})


test("property should be deleted with remove todolist", () => {
    const startState: TasksStateType = {
        "todolistid1": [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },
          ],
          "todolistid2": [
            { id: "1", title: "RUN", isDone: true },
            { id: "2", title: "SWIM", isDone: false },
            { id: "3", title: "Fly", isDone: true },
          ],
    }

    const action = RemoveTodolistAC ("todolistid2")
    const endState = tasksReducer( startState, action )

   const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistid2"]).toBeUndefined()
})




