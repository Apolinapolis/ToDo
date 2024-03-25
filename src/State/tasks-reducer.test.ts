import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"



test("correct task should be delete from tasks array", () => {
    const startState:TasksStateType = {
        todolistid1: [
            { id: "1", title: "2x React", isDone: true },
            { id: "2", title: "2x Resume", isDone: true },
            { id: "3", title: "Sport", isDone: true },

          ],
          todolistid2: [
            { id: "4", title: "RUN", isDone: true },
            { id: "5", title: "SWIM", isDone: false },
          ]
    }
})


