const express=require("express")
const router= express.Router()
const axeController= require("../controllers/axe")
const ensure_auth= require("../middlewares/authenticated")

router.post("/addAxe", axeController.addAxe)
router.put("/disableAxe", axeController.disableAxe)
router.put("/updateAxe", axeController.updateAxe)
router.get("/getOneAxe/:id", axeController.getAsingleAxe)
router.get("/countAllAxe", axeController.countAllAxe)
router.post("/getAllAxe", axeController.getAllAxes)
router.post("/axeSelectByParams", axeController.axeSelectByParams)
module.exports= router