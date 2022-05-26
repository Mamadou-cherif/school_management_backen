const express=require("express")
const router= express.Router()
const actionController= require("../controllers/action")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addAction", actionController.addAction)
    router.put("/disableAction", actionController.disableAction)
    router.put("/updateAction", actionController.updateAction)
    router.get("/getOneAction/:id", actionController.getAsingleAction)
    router.post("/getAllAction", actionController.getAllActions)
    router.post("/actionsSelectBy", actionController.actionsSelectBy)

module.exports= router