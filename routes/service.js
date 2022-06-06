const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service")
const ensure_auth = require("../middlewares/authenticated")

router.post("/addService", serviceController.addService)
router.put("/disableService", serviceController.disableService)
router.put("/updateService", serviceController.updateService)
router.get("/getOneService/:id", serviceController.getAsingleService)
router.get("/getAllService", serviceController.getAllServices)
router.post("/serviceSelectBy", serviceController.serviceSelectBy)

module.exports = router