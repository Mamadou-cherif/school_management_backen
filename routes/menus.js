const express=require("express")
const router= express.Router()
const menuController= require("../controllers/menus")

    router.post("/addMenu", menuController.addMenu)
    router.put("/disableMenu", menuController.disableMenu)
    // ramène tous les menus principaux
    router.get("/getMenuPere", menuController.getMenuPere)
    // ramène tous les sous menus qu'un groupe ne possede pas en 'tout'
    router.get("/getMenuFilsByGroupe", menuController.getMenuFilsByGroupe)
    // Ramene tous les sous menus qui ont des onglets
    router.get("/getWithOnglets", menuController.getWithOnglets)
    
module.exports= router