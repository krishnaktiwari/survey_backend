const express = require("express")
const bodyParser = require("body-parser")
const db_connection = require("./database/config")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const r = require("./routes/routes")
app.use("/",r)


app.listen(7000,console.log("running on port 7000"))