const express=require("express")
const router= express.Router()
const hypotheseController= require("../controllers/hypothese")

router.post("/addHypothese", hypotheseController.addHypothese)
router.put("/disableHypothese", hypotheseController.disableHypothese)
router.put("/updateHypothese", hypotheseController.updateHypothese)
router.get("/getOneHypothese/:id", hypotheseController.getAsingleHypothese)
router.post("/getAllHypothese", hypotheseController.getAllHypotheses)
router.post("/hypotheseSelectBy", hypotheseController.hypotheseSelectBy)
  
module.exports= router 