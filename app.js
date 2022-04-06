const express= require("express")
const app= express()
const bienvenueRoute= require("./routes/bienvenue")
const userRoute= require("./routes/user")
const bodyParser= require("body-parser")

app.use(bodyParser.json())
app.use("/api", bienvenueRoute)
app.use("/api", userRoute)

module.exports= app