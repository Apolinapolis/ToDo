import { userReducer } from "./user-reducer"

test("user reduser should increment age for 1", () => {
    const startState = {age: 33, childrenCount: 0, name: "Dimas"}
    const endState = userReducer(startState, {type: "INCREMENT_AGE"})

    expect(endState.age).toBe(34)
    expect(endState.childrenCount).toBe(0)
}) 

test("user reduser should increment only childrenCount", () => {
    const startState = {age: 33, childrenCount: 0, name: "Dimas"}
    const endState = userReducer(startState, {type: "INCREMENT_CHILDREN_COUNT"})

    expect(endState.childrenCount).toBe(1)
    expect(endState.age).toBe(33)
}) 

test("user reduser should change name of user", () => {
    const startState = {age: 33, childrenCount: 0, name: "Dimas"}
    const newName = "Povelitel"
    const endState = userReducer(startState, {type: "CHANGE_NAME", newName: newName})

    expect(endState.childrenCount).toBe(0)
    expect(endState.age).toBe(33)
    expect(endState.name).toBe(newName)
}) 