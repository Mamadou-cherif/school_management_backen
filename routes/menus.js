const express=require("express")
const router= express.Router()
const menuController= require("../controllers/menus")
 
    router.post("/addAMenu", menuController.addaMenu)
    router.get("/getAllMenus", menuController.getAllMenu)
    router.get("/getOneMenu/:id", menuController.getAsingleMenu)
    router.put("/disableMenu", menuController.disableMenu)
    router.put("/updateMenu/:id", menuController.updatatMenu)
    // ramène tous les menus principaux
    router.get("/getMenuPere", menuController.getMenuPere)
    router.get("/getMenuFils", menuController.getMenuFils)
    // ramène tous les sous menus qu'un groupe ne possede pas en 'tout'
   // router.get("/getMenuFilsByGroupe", menuController.a)
    router.post("/getMenuFilsByGroupe", menuController.getMenuFilsByGroupe)
    // Ramene tous les sous menus qui ont des onglets
    router.post("/getWithOnglets", menuController.getWithOnglets);
    router.post("/getFilsByPere", menuController.getFilsByPere);

    router.get("/getMenuPrincipalByUser/:id", menuController.menus_getMenuPrincipalByUser);
    router.get("/getMenuFilsByUserReference/:id", menuController.menus_getMenuFilsByUserReference);
    
    

    
module.exports= router 