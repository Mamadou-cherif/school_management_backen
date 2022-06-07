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
const prestaireRoute = require("./routes/prestataire")
const structureRoute = require("./routes/structure")
const regionsRoute = require("./routes/regions")
const prefectureRoutes = require("./routes/prefectures")
const quartiersRoutes = require("./routes/quartier")
const communesRoutes = require("./routes/communes")
const axeRoutes = require("./routes/axe")
const evaluationRoutes = require("./routes/evaluation")
const chaineRoutes = require("./routes/chaineResultat")
const programmeRoutes = require("./routes/programme")
const prioriteRoutes = require("./routes/priorite")
const projetRoutes = require("./routes/projet")
const financementRoutes = require("./routes/financement")
const actionRoutes = require("./routes/actions")
const statuProjetRoutes = require("./routes/statutprojet")
const serviceConcerneRoutes = require("./routes/serviceconcerne")
const serviceRoutes = require("./routes/service")
const checktokenexpire = require("./routes/checktokenexpire")
const categorieactionRoute = require("./routes/categorieaction")
const categorieinvestRoute = require("./routes/categorieinves")
const typeDocumentRoute = require("./routes/typeDocument")
const typeExpertiseRoute = require("./routes/typeExpertise")
const rubriqueEvaluationRoute = require("./routes/rubriqueEvaluation")
const applicationRoute = require("./routes/application")
const couleurRoute = require("./routes/couleur");
const uniteRoute= require("./routes/unite")
const anneecibleRoute= require("./routes/anneecible")
const budgetPrevisionnelRoute= require("./routes/budgetprevisionnel")
const interventionRoute = require("./routes/intervention")
const documentRoute = require("./routes/document")
const executionRoute = require("./routes/execution")
const indicateurRoutes = require("./routes/indicateur")
const investissementRoute = require("./routes/investissement")
const hypotheseRoute = require("./routes/hypothese")
const rubriqueRoute = require("./routes/rubrique")


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use("/api", checktokenexpire)
app.use("/api", bienvenueRoute)
app.use("/api", userRoute)
app.use("/api", groupeRoute)
app.use("/api", userGroupeRoute)
app.use("/api", menuRoute),
app.use("/api", ongletRoute)
app.use("/api", modeAccesRoute)
app.use("/api", privilegeRoute)
app.use("/api", paysRoute)
app.use("/api", couleurRoute)
app.use("/api", prestaireRoute)
app.use("/api", structureRoute)
app.use("/api", regionsRoute)
app.use("/api", prefectureRoutes)
app.use("/api", quartiersRoutes)
app.use("/api", communesRoutes)
app.use("/api", axeRoutes)
app.use("/api", deviseRoute)
app.use("/api", programmeRoutes)
app.use("/api", prioriteRoutes)
app.use("/api", financementRoutes)
app.use("/api", projetRoutes)
app.use("/api", actionRoutes)
app.use("/api", statuProjetRoutes)
app.use("/api", serviceConcerneRoutes)
app.use("/api", serviceRoutes) 
app.use("/api", categorieactionRoute)
app.use("/api", categorieinvestRoute)
app.use("/api", uniteRoute)
app.use("/api", anneecibleRoute)
app.use("/api", typeDocumentRoute)
app.use("/api", typeExpertiseRoute)
app.use("/api", rubriqueEvaluationRoute)
app.use("/api", applicationRoute)
app.use("/api", budgetPrevisionnelRoute)
app.use("/api", documentRoute)
app.use("/api", interventionRoute)
app.use("/api", executionRoute)
app.use("/api", investissementRoute)
app.use("/api", chaineRoutes)
app.use("/api", indicateurRoutes)
app.use("/api", hypotheseRoute)
app.use("/api", rubriqueRoute)




module.exports = app