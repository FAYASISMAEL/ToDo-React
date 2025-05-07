import express from "express"
import connection from "./connection.js"
import todoRoutes from "./routes/todo.routes.js"
import cors from "cors"

const port = 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/todo", todoRoutes)


connection().then(()=>{
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`)
    })    
}).catch((error)=>console.log(error))