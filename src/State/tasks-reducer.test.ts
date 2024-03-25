import { TasksStateType } from "../App"
import { tasksReducer, removeTaskAC, addTaskAC } from "./tasks-reducer"



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




