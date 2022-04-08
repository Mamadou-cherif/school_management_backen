const express= require("express")
const app= express()
const bienvenueRoute= require("./routes/bienvenue")
const userRoute= require("./routes/user")
const bodyParser= require("body-parser")
const  groupeRoute= require("./routes/groupes")
const userGroupeRoute= require("./routes/userGroupes")

app.use(bodyParser.json())

    app.use("/api", bienvenueRoute)
    app.use("/api", userRoute)
    app.use("/api", groupeRoute)
    app.use("/api", userGroupeRoute)

module.exports= app