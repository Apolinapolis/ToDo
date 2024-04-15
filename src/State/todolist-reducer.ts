import { FilterValuesType, ToDoListType } from "../App"
import { v1 } from 'uuid';

type ActionType = REMOVE_TODOLISTactionType | ADD_TODOLISTactionType | CHANGE_TODOLIST_FILTERactionType | CHANGE_TODOLIST_TITLEactionType 


export type REMOVE_TODOLISTactionType = {
type: "REMOVE_TODOLIST",
id: string
}
export type ADD_TODOLISTactionType = {
type: "ADD_TODOLIST",
title: string
id: string
}
export type CHANGE_TODOLIST_FILTERactionType = {
type: "CHANGE_TODOLIST_FILTER",
id: string
filter: FilterValuesType
}
type CHANGE_TODOLIST_TITLEactionType = {
type: "CHANGE_TODOLIST_TITLE",
id: string
title: string
}

export let todolistid1 = v1()

const initialState:Array<ToDoListType> = [
    { id: todolistid1, title: "Настроение отличное ;)", filter: "All" }
]
export const todolistsReducer = (state: Array<ToDoListType> = initialState, action: ActionType): Array<ToDoListType>  => {

    switch (action.type) {
        case "REMOVE_TODOLIST":
           return state.filter(tl => tl.id !== action.id)
        case "ADD_TODOLIST":
            return [{id: action.id, title: action.title, filter: "All"}, ...state ]
        case "CHANGE_TODOLIST_TITLE":
            const todolist = state.find(t => t.id === action.id)
            // если нашелся
            if (todolist) { todolist.title = action.title }
            return [...state];
        case "CHANGE_TODOLIST_FILTER":
            const list = state.find(t => t.id === action.id)
            // если нашелся
            if (list) { list.filter = action.filter }
            return [...state];    
        default: return state
    }
}

export const RemoveTodolistAC = (listId:string): REMOVE_TODOLISTactionType => {return {type: "REMOVE_TODOLIST", id:listId}}

export const AddTodolistAC = (title:string): ADD_TODOLISTactionType => {return {type: "ADD_TODOLIST", title, id: v1()}}

export const ChangeTodolistTitleAC = (newListTitle:string, currentID:string): CHANGE_TODOLIST_TITLEactionType => {
    return {type: "CHANGE_TODOLIST_TITLE", title: newListTitle, id:currentID}}

export const ChangeTodolistFilterAC = (newFilter:FilterValuesType, currentID:string): CHANGE_TODOLIST_FILTERactionType => {
    return {type: "CHANGE_TODOLIST_FILTER", filter: newFilter, id:currentID}}