import './App.css'
import { useState } from 'react';
import "./index.css";
import { v4 as uuidv4 } from 'uuid';


export default function Todo() {
    let [tasks, setTask] = useState([]);
    let [newTask, setNewTask] = useState("");
    let [toUpperCaseAll, changeCase] = useState(false);

    let addNewTask = () => {
        setTask([...tasks, { id: uuidv4(), task: newTask, isDone: false }]);
        setNewTask("");
    }

    let updateTodo = (event) => {
        setNewTask(event.target.value)
    }

    let deleteTask = (id) => {
        setTask(() => tasks.filter((prevtodos) => prevtodos.id !== id));
    }
    let toUpperCase = () => {
        setTask((allTodos) => allTodos.map(((todo) => {
            return { ...todo, task: todo.task.toUpperCase() };
        })));
        changeCase(true);
    }
    let toLowerCase = () => {
        setTask((allTodos) => allTodos.map(((todo) => {
            return { ...todo, task: todo.task.toLowerCase() };
        })));
        changeCase(false);
    }

    let completed = (id)=>{
        setTask(tasks.map((task) =>
            task.id === id ? { ...task, isDone: true } : task
        ));
    }
    return (
        <div>
            <h1>To-do App</h1>
            <input type="text" placeholder='Enter your Task' value={newTask} onChange={updateTodo} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={addNewTask}>Add Task</button><br /><br />
            <hr />
            <h3>Tasks To-do</h3>
            {(tasks.length > 0 ? (
                <ul>
                    {/* {console.log(tasks.id)} */}
                    {tasks.map((todo) => (
                        <li key={todo.id} ><span   className={todo.isDone?"done" :""}>{todo.task}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            &nbsp;&nbsp;
                            <i onClick={() => deleteTask(todo.id)} className="fa-solid fa-xmark"></i>
                            &nbsp;&nbsp;
                            <i onClick={()=> completed(todo.id)} className="fa-solid fa-check "></i>
                        </li>

                    ))}
                </ul>) : (
                <p>No Task to display...</p>
            ))}

            {toUpperCaseAll === false ? <button onClick={toUpperCase}> To UpperCase </button> : <button onClick={toLowerCase}> To LowerCase </button>}


        </div>
    );
}
