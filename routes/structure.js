const express = require("express")
const router = express.Router()
const structureController = require("../controllers/structure")

// router.get("/prestataireSelectBy", structureController.prestataireSelectBy)
router.get("/getAllStructure", structureController.getAllStructure)
router.get("/getAllCategorieStructure", structureController.getAllCategorieStructure)
router.post("/addStructure", structureController.addStructure)
router.put("/updateStructure", structureController.updateStructure)
router.put("/disableStructure", structureController.disableStructure)
router.get("/getOneStructure/:id", structureController.getAsingleStructure)
router.get("/countAllStructure", structureController.countAllStructure)

module.exports = router