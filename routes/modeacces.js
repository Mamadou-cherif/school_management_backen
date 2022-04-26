const express=require("express")
const router= express.Router()
const modeAccesController= require("../controllers/modeacces")
const md_auth= require("../middlewares/authenticated")

    router.post("/addModeAcces", modeAccesController.addModeAcces)
    router.get("/getAllModeAcces", modeAccesController.getAllModeAccess)
    router.put("/disableModeAcces", modeAccesController.disableModeAcces)
    // Renvoie tous les mode d'acces qu'un groupe ne possede pas sur un menu
    router.post("/getNonAffectedByMenuAndGroupe", modeAccesController.getNonAffectedByMenuAndGroupe)
    // Renvoie tous les menus qui sont affecté à un groupe
    router.post("/getPrincipalAffecteAUnGroupe", modeAccesController.getPrincipalAffecteAUnGroupe)
    router.post("/getFilsAffecteAUnGroupe", modeAccesController.getFilsAffecteAUnGroupe)

    // renvoie tous modes accès qu'un groupe possède sur un menu donné
    router.post("/getAffectesByMenuAndGroupe", modeAccesController.getAffectesByMenuAndGroupe)
    // Renvoie tous les mode d'acces qu'un groupe ne possede pas sur un onglet
    router.post("/getNotAffectedByOngletAndGroupe", modeAccesController.getNotAffectedByOngletAndGroupe)
        // renvoie tous modes accès qu'un groupe possède sur un onglet donné
    router.post("/getAffectedByOngletAndGroupe", modeAccesController.getAffectedByOngletAndGroupe)
    router.put("/updateModeAcces/:id", modeAccesController.updateModeAcces)
    router.get("/getModeAccesById/:id",modeAccesController.getModeAccessById)



    module.exports = router 