import { ITask, ITaskCreate } from "../model/task";
import { ToDoList } from "../model/toDoList";

export class TaskController {
    private toDoList: ToDoList;
    private idCounter: number;

    constructor() {
        this.toDoList = {};
        this.idCounter = 0;
    }

    private giveId(): number {
        this.idCounter = this.idCounter + 1;
        return this.idCounter;
    }

    exist(id:number):boolean {
        if(this.toDoList[id]) {
            return true;
        }
        return false;
    }

    getAll():ToDoList {
        return this.toDoList;
    }

    insert(task: ITaskCreate) {
        const newId = this.giveId();
        this.toDoList[newId] = {
            id: newId,
            title: task.title,
            done: false,
        }
    }

    update(id: number, task: ITask) {
        this.toDoList[id] = task;
    }

    delete(id:number) {
        delete this.toDoList[id]
    }
}