const express = require("express")
const app = express()
const bienvenueRoute = require("./routes/bienvenue")
const userRoute = require("./routes/user")
const bodyParser = require("body-parser")
const groupeRoute = require("./routes/groupes")
const deviseRoute = require("./routes/devise")
const userGroupeRoute = require("./routes/userGroupes")
const menuRoute = require("./routes/menus")
const ongletRoute = require("./routes/onglets")
const modeAccesRoute = require("./routes/modeacces")
const privilegeRoute = require("./routes/privileges")
const paysRoute = require("./routes/pays")
const regionsRoute = require("./routes/regions")
const prefectureRoutes = require("./routes/prefectures")
const quartiersRoutes = require("./routes/quartier")
const communesRoutes = require("./routes/communes")
const checktokenexpire = require("./routes/checktokenexpire")
const applicationRoute = require("./routes/application")
const couleurRoute = require("./routes/couleur");
const flotteRoute = require("./routes/flotte");
const typeFonctionRoute = require("./routes/typeFonction");
const personnelRoute = require("./routes/personnel");
const statuProjetRoutes = require("./routes/statutprojet")
const camionRoutes = require("./routes/camion")
const contratRoutes = require("./routes/contrat")
const camionChauffeurRoutes = require("./routes/camionchauffeur")
 const contratFlotteRoutes = require("./routes/contratflotte")
 const camionSiteRoutes = require("./routes/camionsite")
 const trajetRoutes = require("./routes/trajet")
 const bonlivraisonRoutes = require("./routes/bonlivraison")
 const equipeRoutes = require("./routes/equipe")
 const equipepersonnelRoutes = require("./routes/equipepersonnel")

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use("/", bienvenueRoute)
app.use("/api", checktokenexpire)
app.use("/api", userRoute)
app.use("/api", groupeRoute)
app.use("/api", userGroupeRoute)
app.use("/api", menuRoute),
app.use("/api", ongletRoute)
app.use("/api", modeAccesRoute)
app.use("/api", privilegeRoute)
app.use("/api", paysRoute)
app.use("/api", couleurRoute)
app.use("/api", regionsRoute)
app.use("/api", prefectureRoutes)
app.use("/api", quartiersRoutes)
app.use("/api", communesRoutes)
app.use("/api", deviseRoute)
app.use("/api", applicationRoute)
app.use("/api", flotteRoute)
app.use("/api", typeFonctionRoute)
app.use("/api", personnelRoute)
app.use("/api", statuProjetRoutes)
app.use("/api", camionRoutes)
app.use("/api", camionChauffeurRoutes)
app.use("/api", contratRoutes)
app.use("/api", contratFlotteRoutes)
app.use("/api", camionSiteRoutes)
app.use("/api", trajetRoutes)
app.use("/api", bonlivraisonRoutes)
app.use("/api", equipeRoutes)
app.use("/api", equipepersonnelRoutes)

module.exports = app
