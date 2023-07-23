const express=require("express")
const router= express.Router()
const equipespersonnelController= require("../controllers/equipepersonnel")

    router.post("/equipespersonnelSelectBy", equipespersonnelController.equipespersonnelSelectBy)
    router.get("/selectAllEquipesPersonnel", equipespersonnelController.selectAllEquipesPersonnel)
    router.get("/selectByIdEquipesPersonnel/:id", equipespersonnelController.selectByIdEquipesPersonnel)
    router.post("/getPersonnelAffectedToEquipe", equipespersonnelController.getPersonnelAffectedToEquipe)
    router.post("/addEquipesPersonnel", equipespersonnelController.addEquipesPersonnel)
    router.put("/updateEquipesPersonnel", equipespersonnelController.updateEquipesPersonnel)
    router.delete("/deleteEquipesPersonnel/:id", equipespersonnelController.deleteEquipesPersonnel)

    module.exports= router 