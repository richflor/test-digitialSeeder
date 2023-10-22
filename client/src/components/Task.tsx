import { ITask } from '../../../server/model/task';

export interface IAppProps {
    data: ITask;
    deleteTask: (task:ITask)=> Promise<void>;
    updateTask: (task:ITask)=> Promise<void>;
    updateList: () => Promise<void>;
}

export function Task ({ data , updateTask, deleteTask, updateList}: IAppProps) {
  return (
    <li className='task_container'>
        <p>{data.title}</p>
        <div className="buttons_task_container">
          <button className="update" onClick={async ()=> {
              updateTask(data).
              then(() => updateList());
          }}>Update</button>
          <button className="delete" onClick={async ()=> { 
              deleteTask(data)
              .then(() => updateList());
          }}>Delete</button>          
        </div>

    </li>
  );
}
