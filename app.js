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
const paysRoute= require("./routes/pays")
const prestaireRoute= require("./routes/prestataire")
const structureRoute= require("./routes/structure")
const regionsRoute= require("./routes/regions")
const prefectureRoutes= require("./routes/prefectures")
const quartiersRoutes= require("./routes/quartier")
const communesRoutes= require("./routes/communes")

const a= require("./a")


app.use(bodyParser.json())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

        next();
    });
    app.use("/api", bienvenueRoute)
    app.use("/api", userRoute)
    app.use("/api", groupeRoute)
    app.use("/api", userGroupeRoute)
    app.use("/api", menuRoute),
    app.use("/api", ongletRoute)
    app.use("/api", modeAccesRoute)
    app.use("/api", privilegeRoute)
    app.use("/api", paysRoute)
    app.use("/api", prestaireRoute)
    app.use("/api", structureRoute)
    app.use("/api", regionsRoute)
    app.use("/api", prefectureRoutes)
    app.use("/api", quartiersRoutes)
    app.use("/api", communesRoutes)
    


module.exports= app