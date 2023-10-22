import { ITask } from '../../../server/model/task';
import { ToDoList } from '../../../server/model/toDoList';

export interface IAppProps {
    data: ITask;
    deleteTask: (task:ITask)=> Promise<void>;
    updateTask: (task:ITask)=> Promise<void>;
    updateList: () => Promise<void>;
}

export function Task ({ data , updateTask, deleteTask, updateList}: IAppProps) {
  return (
    <li>
        <p>{data.title}</p>
        <button className="update" onClick={async ()=> {
            updateTask(data).
            then(() => updateList());
        }}>Update</button>
        <button className="delete" onClick={async ()=> { 
            deleteTask(data)
            .then(() => updateList());
        }}>Delete</button>
    </li>
  );
}
