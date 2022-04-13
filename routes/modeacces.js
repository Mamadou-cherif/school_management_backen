const express=require("express")
const router= express.Router()
const modeAccesController= require("../controllers/modeacces")

    router.post("/addModeAcces", modeAccesController.addModeAcces)
    router.put("/disableModeAcces", modeAccesController.disableModeAcces)
    // Renvoie tous les mode d'acces qu'un groupe ne possede pas sur un menu
    router.get("/getNonAffectedByMenuAndGroupe", modeAccesController.getNonAffectedByMenuAndGroupe)
    // Renvoie tous les menus qui sont affecté à un groupe
    router.get("/getPrincipalAffecteAUnGroupe", modeAccesController.getPrincipalAffecteAUnGroupe)
    // renvoie tous modes accès qu'un groupe possède sur un menu donné
    router.get("/getAffectesByMenuAndGroupe", modeAccesController.getAffectesByMenuAndGroupe)
    // Renvoie tous les mode d'acces qu'un groupe ne possede pas sur un onglet
    router.get("/getNotAffectedByOngletAndGroupe", modeAccesController.getNotAffectedByOngletAndGroupe)
        // renvoie tous modes accès qu'un groupe possède sur un onglet donné
    router.get("/getAffectedByOngletAndGroupe", modeAccesController.getAffectedByOngletAndGroupe)



    module.exports = router 