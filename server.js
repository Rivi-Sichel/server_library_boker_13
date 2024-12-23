import express from "express"
import dotenv from "dotenv"
import fs from "fs/promises";
import cors from "cors"

import bookRouter from "./routers/book.js";
import userRouter from "./routers/user.js";
import borrowRouter from "./routers/borrow.js";
import { connectToDb } from "./config/DB.js";


function PrintToLog(req, res, next) {
    try {
        fs.appendFile("./log.txt", ` ${new Date().toLocaleDateString()} ${req.method} ${req.url}`)
        next();
    }
    catch (err) {
        return res.status(400).json({ title: "error in printto Log", message: err.message })
    }
}

dotenv.config()
const app = express();
connectToDb()
// app.use(cors({origin:"http://localhost:5173"}))
app.use(cors())//כך נתתי לכולם רשות
app.use(PrintToLog)

app.use(express.json())

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/borrow", borrowRouter);

let port = process.env.PORT;

app.listen(port,  () => {
    console.log("app is listening on port " + port)
})


