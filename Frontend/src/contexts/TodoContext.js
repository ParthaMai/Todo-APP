import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos: [ // this is a array
        {
            id: 1,
            todo: " Todo msg",
            completed: false // checkbox
        }
    ],
    // here define only functions
    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider 