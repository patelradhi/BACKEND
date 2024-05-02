const express = require("express")
const app = express()
const router = require("./routes/router")
const cors = require("cors")
const cookieParser = require('cookie-parser');


//entract with json

app.use(express.json())
//
app.use(cookieParser());
//
app.use(cors())

app.use(router)
//port number

const port = 9300

//server started


app.listen (port,()=>{
    console.log(`Server started at port number ${port}`)
})




