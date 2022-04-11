const express= require("express")
const app= express()
const bienvenueRoute= require("./routes/bienvenue")
const userRoute= require("./routes/user")
const bodyParser= require("body-parser")
const  groupeRoute= require("./routes/groupes")
const userGroupeRoute= require("./routes/userGroupes")
const menuRoute= require("./routes/menus")
const ongletRoute= require("./routes/onglets")
const modeAccesRoute= require("./routes/modeacces")
const privilegeRoute= require("./routes/privileges")
app.use(bodyParser.json())

    app.use("/api", bienvenueRoute)
    app.use("/api", userRoute)
    app.use("/api", groupeRoute)
    app.use("/api", userGroupeRoute)
    app.use("/api", menuRoute),
    app.use("/api", ongletRoute)
    app.use("/api", modeAccesRoute)
    app.use("/api", privilegeRoute)


module.exports= app