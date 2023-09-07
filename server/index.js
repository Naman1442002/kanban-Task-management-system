const express = require('express')
const dotenv=require("dotenv")
const router=require('./Routes/Task')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use("/Kanban", router.Route)
app.listen(process.env.PORT,()=>{
    console.log(`listen on port ${process.env.PORT}`)
})