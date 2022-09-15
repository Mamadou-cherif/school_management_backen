const express=require("express")
const router= express.Router()
const activiteserviceController= require("../controllers/activiteservice")

    router.post("/addActiviteService", activiteserviceController.addActiviteService)
    router.put("/disableActiviteService", activiteserviceController.disableActiviteService)
    router.put("/updateActiviteService", activiteserviceController.updateActiviteService)
    router.get("/getOneActiviteService/:id", activiteserviceController.getAsingleActiviteService)
    router.post("/getAllActiviteService", activiteserviceController.getAllActiviteService)
    router.post("/activiteserviceSelectBy", activiteserviceController.activiteserviceSelectBy)

module.exports= router