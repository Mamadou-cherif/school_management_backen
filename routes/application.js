const express=require("express")
const router= express.Router()
const applicationController= require("../controllers/application")

router.get("/selectAllApplication", applicationController.selectAllApplication)
router.get("/selectByIdApplication/:id", applicationController.selectByIdApplication)
router.post("/addApplication", applicationController.addApplication)
router.put("/updateApplication", applicationController.updateApplication)
router.delete("/deleteApplication/:id", applicationController.deleteApplication)

module.exports= router