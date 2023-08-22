import "./styles.css" // our CSS
import { useState, useEffect } from 'react' // importing hooks from React
import TodoList from "./components/TodoList" // importing a component

export default function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos")
        if (savedTodos && savedTodos !== "undefined" && savedTodos !== "null") {
          setTodos(JSON.parse(savedTodos))
        }
      }, [])

    const addTodo = (e) => {
        const newTodo = { text: e.target.value, id: Date.now(), completed: false }
        localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]))
        setTodos([newTodo, ...todos])
        e.target.value = '' // clearing out the input field
    }

    const completeTodo = (id, e) => {
        const todosCopy = [...todos] // this is a copy of todos
        const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
        todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed // toggling the complete
        localStorage.setItem("todos", JSON.stringify([...todosCopy]))
        setTodos([...todosCopy])
    }

    const editTodoText = (id, e) => {
        const todosCopy = [...todos]
        const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
        todosCopy[indexOfTodo].text = e.target.value
        localStorage.setItem("todos", JSON.stringify([...todosCopy]))
        setTodos([...todosCopy])
        e.target.value = "" // clearing the input field
      }
    
    const deleteTodo = (id) => {
        const todosCopy = [...todos]
        const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
        todosCopy.splice(indexOfTodo, 1)
        localStorage.setItem(
            "todos",
            JSON.stringify([...todosCopy])
          )
        setTodos([...todosCopy])
      }

    return (
      <div className="App">
        <TodoList
        todos={todos}
        addTodo={addTodo}
        completeTodo={completeTodo}
        editTodoText={editTodoText}
        deleteTodo={deleteTodo}
      />
      </div>
    )
  }
