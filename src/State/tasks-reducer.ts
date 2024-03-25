import { TasksStateType } from "../App"


export type Action1Type = {
    type: "1",
    id: string
}
export type Action2Type = {
    type: "2",
    title: string
}

type ActionsType = Action2Type | Action1Type


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "1":
            return { ...state }
        case "2":
            return { ...state }
    }
}



export const action1AC = (id: string): Action1Type => {
    return { type: "1", id: id }
}
export const action2AC = (title: string): Action2Type => {
    return { type: "2", title: title }
}