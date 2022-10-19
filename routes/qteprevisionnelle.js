const express=require("express")
const router= express.Router()
const qteprevisionnelleController= require("../controllers/qteprevisionnelle")

    router.post("/addQtePrevisionnelle", qteprevisionnelleController.addQtePrevisionnelle)
    router.put("/disableQtePrevisionnelle", qteprevisionnelleController.disableQtePrevisionnelle)
    router.delete("/deleteQtePrevisionnelle/:id", qteprevisionnelleController.deleteQtePrevisionnelle)
    router.put("/updateQtePrevisionnelle", qteprevisionnelleController.updateQtePrevisionnelle)
    router.get("/getOneQtePrevisionnelle/:id", qteprevisionnelleController.getAsingleQtePrevisionnelle)
    router.get("/selectPapb", qteprevisionnelleController.selectPapb)
    router.post("/selectPaabByPapbId", qteprevisionnelleController.selectPaabByPapbId)
    router.post("/selectActiviteByPaabId", qteprevisionnelleController.selectActiviteByPaabId)
    router.get("/getOneQtePrevisionnelle/:id", qteprevisionnelleController.getAsingleQtePrevisionnelle)
    router.get("/getAllQtePrevisionnelle", qteprevisionnelleController.getAllQtePrevisionnelle)
    router.post("/qteprevisionnelleSelectBy", qteprevisionnelleController.qteprevisionnelleSelectBy)

module.exports= router