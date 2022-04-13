const express=require("express")
const router= express.Router()
const ongletController= require("../controllers/onglets")

    router.post("/addOnglet", ongletController.addOnglet)
    router.put("/disableOnglet", ongletController.disableOnglet)
    //ramene tous les onglets qu'un groupe ne possède pas en "tout"
    router.get("/getOngletByGroupe", ongletController.getOngletByGroupe)
    // renvoie tous les onglets qui sont affecté à un groupe donné
    router.get("/getAffectesByGroupeAndMenu", ongletController.getAffectesByGroupeAndMenu)
    // renvoie tous les onglets affectés à un groupe donné
    router.get("/getOngletsAffecteAUnGroupe", ongletController.getOngletsAffecteAUnGroupe)

module.exports= router