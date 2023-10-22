import { useState } from 'react';

export interface IAppProps {
    add: (taskTitle:string) => Promise<void>;
    updateList: () => Promise<void>;
}

export function AddInput ({ add, updateList }: IAppProps) {

    const [taskTitle, setTaskTitle] = useState<string>("")

    return (
    <div className="addTask_container">
        <input type="text" onChange={(e) => {
            setTaskTitle(e.target.value);
          }}/>
        <button type="submit" onClick={ async () => {
            if(taskTitle) {
                console.log(taskTitle)
                await add(taskTitle)
                updateList();
            } else {
                alert("Task must have a name")
            }
        }}>Submit</button>
    </div>
    );
}
