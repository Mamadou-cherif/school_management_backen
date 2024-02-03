const express=require("express")
const router= express.Router()
const quartierController= require("../controllers/quartier")

router.post("/quartierSelectBy", quartierController.quartierSelectBy)
router.get("/selectAllQuartier", quartierController.selectAllQuartier)
router.get("/selectByIdQuartier/:id", quartierController.selectByIdQuartier)
router.post("/addQuartier", quartierController.addQuartier)
router.put("/updateQuartier", quartierController.updateQuartier)
router.delete("/deleteQuartier/:id", quartierController.deleteQuartier)
module.exports= router