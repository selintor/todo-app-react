import React, {useState, useEffect} from 'react';
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // states
  const [inputText, setInputText] = useState ("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    const filterHandler = () => {
      switch(status){
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    saveLocalTodos();
  }, [todos, status]);
  // functions

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  return (
    <div className="General">
      {/* <h1>todos {inputText} </h1> */}
      <h1>todos</h1>
      <div className="Box">
        <Form 
        inputText = {inputText} 
        setTodos = {setTodos} 
        todos = {todos} 
        setInputText = {setInputText} 
        setStatus = {setStatus}
        />
        <TodoList 
        setTodos = {setTodos} 
        todos = {todos}
        filteredTodos = {filteredTodos} 
        />
      </div>  
    </div>
  );
}

export default App;
