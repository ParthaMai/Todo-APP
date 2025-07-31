import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos ((prev) => [{id: Date.now(), ...todo}, ...prev]) // prev is previous all todos and ...prev is spread prev means all previous todo + new todo
  }

  const updateTodo = (id, todo ) => {
    setTodos ((prev) => prev.map((prevTodo) => (prevTodo.id 
      === id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !==id)) // prev.filter is a filtering a array and copy to a new array
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === 
    id ?{...prevTodo, completed: !prevTodo.completed}  : prevTodo))
  }

// Local storage
  useEffect(() =>{
    const todos = JSON.parse(localStorage.getItem("todos")); // fetch data from local storage and that data is string 
                                              // we want to data into json format so use json.parse
    if(todos && todos.length >0){ // this is for existing previous todos in local storage
      setTodos(todos)
    }
  }, [])
// for add todo in local storge
 useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
 },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
       <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
