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
        this.idCounter = this.idCounter++;
        return this.idCounter;
    }

    getAll():ToDoList {
        return this.toDoList;
    }

    insert(task: ITaskCreate) {
        const newId = this.giveId();
        this.toDoList[newId] = {
            id: this.giveId(),
            title: task.title,
            done: false,
        }
    }

    update(task: ITask) {
        this.toDoList[task.id] = task;
    }

    delete(id:number) {
        delete this.toDoList[id]
    }
}