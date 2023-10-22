import express, {Response, Request, NextFunction} from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;;

app.use(express.json())

app.get("/", (_req, res)=> {
    res.status(400).send("Test is working !!");
})

app.listen(port, ()=> console.log(`API running on port:${port}`));