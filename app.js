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
const typeFonctionRoute = require("./routes/typefonction");
const ecoleRoute = require("./routes/ecole");
const eleveRoute = require("./routes/eleve");
const classseRoute = require("./routes/classse");
const trancheRoute = require("./routes/tranche");
const payementRoute = require("./routes/payement");
const prestationRoute = require("./routes/prestation");
const ficheRenRoute = require("./routes/ficherenseignement");
const storySaleRoute = require("./routes/storySale");

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
    app.use("/api", typeFonctionRoute)
    app.use("/api", ecoleRoute)
    app.use("/api", eleveRoute)
    app.use("/api", trancheRoute)
    app.use("/api", classseRoute)
    app.use("/api", payementRoute)
    app.use("/api", prestationRoute)
    app.use("/api", ficheRenRoute)
    app.use("/api", storySaleRoute)


module.exports = app
