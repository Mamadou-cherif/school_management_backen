const express=require("express")
const router= express.Router()
const qteprevisionnelleController= require("../controllers/qteprevisionnelle")

    router.post("/addQtePrevisionnelle", qteprevisionnelleController.addQtePrevisionnelle)
    router.put("/disableQtePrevisionnelle", qteprevisionnelleController.disableQtePrevisionnelle)
    router.put("/updateQtePrevisionnelle", qteprevisionnelleController.updateQtePrevisionnelle)
    router.get("/getOneQtePrevisionnelle/:id", qteprevisionnelleController.getAsingleQtePrevisionnelle)
    router.get("/getAllQtePrevisionnelle", qteprevisionnelleController.getAllQtePrevisionnelle)
    router.post("/qteprevisionnelleSelectBy", qteprevisionnelleController.qteprevisionnelleSelectBy)

module.exports= router