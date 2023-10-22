import express, {Response, Request, NextFunction} from "express";
import dotenv from 'dotenv';
import { TaskController } from "./controller/TaskController";
import { ITaskCreateSchema, ITaskSchema } from "./model/task";
import { ApiError } from "./utility/Error/ApiError";
import { ErrorCode } from "./utility/Error/ErrorCode";

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

        res.status(201)

    } catch (error:any) {
        next(error)
    }
})

app.put("/update", (req, res, next)=> {
    try {
        const task = req.body
        const parse = ITaskSchema.safeParse(task);
        if(!parse.success) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Not a valid Task")
        }

        res.status(200)

    } catch (error:any) {
        next(error)
    }
})

app.delete("/delete/:id", (req, res, next)=> {
    try {
        const id = Number(req.params);
        if(isNaN(id)) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Not a valid Task")
        }

        toDoList.delete(id);

        res.status(200);

    } catch (error:any) {
        next(error)
    }
})

app.get("/", (_req, res)=> {
    res.status(400).send("Test is working !!");
})

app.listen(port, ()=> console.log(`API running on port:${port}`));