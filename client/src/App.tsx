import { useState } from 'react'
import './App.css'
import { ToDoList } from '../../server/model/toDoList'
import { ITask } from '../../server/model/task'
import { AddInput } from './components/AddInput'
import { Task } from './components/Task'

function App() {
  
  const baseUri = "http://localhost:3000"
  const [toDoList, setToDoList] = useState<ToDoList>({})

  const getToDoList = async () => {

    await fetch(baseUri + "/all")
    .then(response => response.json())
    .then(data => setToDoList(data))
    .catch(error => console.log(error));

    console.log(toDoList)
  }

  const addTask = async (taskTitle:string) => {
    await fetch(baseUri + "/new", {
        method: "POST",
        body: JSON.stringify({
            title: taskTitle
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      })
    .catch(error => console.log(error));
  }

  const updateTask = async (task:ITask) => {
    await fetch(baseUri + "/update/" + task.id, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      })
    .catch(error => console.log(error));
  }

  const deleteTask = async (task:ITask) => {
    await fetch(baseUri + "/delete/" + task.id, {
      method: "DELETE",
    })
    .catch(error => console.log(error));
  }

  return (
    <div className='main_container'>
      <h1>Todo List</h1>
      <AddInput add={addTask} updateList={getToDoList}/>
      <ul>
        {Object.values(toDoList).length > 0 ? Object.values(toDoList).map(task => 
          <Task
            key={task.id}
            data={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            updateList={getToDoList}
          />) : ""}
      </ul>
    </div>
  )
}

export default App
