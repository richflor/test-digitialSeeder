import express, {Response, Request, NextFunction} from "express";
import dotenv from 'dotenv';
import { TaskController } from "./controller/TaskController";
import { ITaskCreateSchema, ITaskSchema } from "./model/task";
import { ApiError } from "./utility/Error/ApiError";
import { ErrorCode } from "./utility/Error/ErrorCode";
import { DefaultErrorHandler } from "./middleware/error-handler.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const toDoList = new TaskController();

app.use(express.json())

app.get('/all', (_req, res, next)=> {
    try {
        const list = toDoList.getAll();
        res.json(list);

    } catch (error:any) {
        next(error)
    }
})

app.post("/new", (req, res, next)=> {
    try {
        const task = req.body
        const parse = ITaskCreateSchema.safeParse(task);
        if(!parse.success) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Title should be a string")
        }

        toDoList.insert(req.body);

        res.status(201).json(task);

    } catch (error:any) {
        next(error)
    }
})

app.put("/update/:id", (req, res, next)=> {
    try {
        const task = req.body
        const id = Number(req.params.id);

        if(isNaN(id)) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Param is not a valid ID")
        }

        const parse = ITaskSchema.safeParse(task);
        if(!parse.success) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Not a valid Task")
        }

        if(!toDoList.exist(id)) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Id not found, Task doesn't exist")
        }

        if (id !== task.id) {
            throw new ApiError(ErrorCode.NotFound, "validation/failed", "Id from JSON and Param are different")
        }

        toDoList.update(id, task);

        res.status(200).json(task);

    } catch (error:any) {
        next(error)
    }
})

app.delete("/delete/:id", (req, res, next)=> {
    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Not a valid Task")
        }

        if(!toDoList.exist(id)) {
            throw new ApiError(ErrorCode.NotFound, "validation/failed", "Id not found, Task doesn't exist")
        }

        toDoList.delete(id);

        res.status(200).json(id);

    } catch (error:any) {
        next(error)
    }
})

app.use(DefaultErrorHandler);

app.listen(port, ()=> console.log(`API running on port:${port}`));