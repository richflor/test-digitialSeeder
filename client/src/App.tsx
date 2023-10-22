import { useState } from 'react'
import './App.css'
import { ToDoList } from '../../server/model/toDoList'
import axios from 'axios'
import { ITask, ITaskCreate } from '../../server/model/task'
import { AddInput } from './components/AddInput'
import { Task } from './components/Task'

function App() {
  
  const baseUri = "http://localhost:3000"
  const [toDoList, setToDoList] = useState<ToDoList>({})

  const getToDoList = async () => {
    const response = await axios.get<any,ToDoList>(baseUri + "/all")
    setToDoList(response);
  }

  const addTask = async (taskTitle:string) => {
    const response = await axios.post<ITaskCreate,ITaskCreate>(baseUri + "/new", {
      title:taskTitle
    })
  }

  const updateTask = async (task:ITask) => {
    const response = await axios.put<ITask,ITask>(baseUri + "/update/" + task.id, task)
  }

  const deleteTask = async (task:ITask) => {
    const response = await axios.delete<any,number>(baseUri + "/delete/" + task.id)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddInput add={addTask} updateList={getToDoList}/>
      <ul>
        {Object.values(toDoList).map(task => 
          <Task 
            data={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            updateList={getToDoList}
          />)}
      </ul>
    </div>
  )
}

export default App
