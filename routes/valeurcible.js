const express=require("express")
const router= express.Router()
const valeurcibleController= require("../controllers/valeurcible")

    router.get("/selectAllValeurCible", valeurcibleController.selectAllValeurCible)
    router.get("/selectAllValeurCibleByProjetId/:id", valeurcibleController.selectValeurCibleByProjetId)
    router.post("/addValeurCible", valeurcibleController.addValeurCible)
    router.put("/disableValeurCible", valeurcibleController.disableValeurCible)
    router.put("/updateValeurCible", valeurcibleController.updateValeurCible)
    router.post("/addValeurCible", valeurcibleController.addValeurCible)
    router.get("/getOneValeurCible/:id", valeurcibleController.getAsingleValeurCible)
    module.exports= router 