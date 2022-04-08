const express=require("express")
const router= express.Router()
const groupeController= require("../controllers/groupes")

    router.post("/addGroupe", groupeController.addGroupe)
    router.delete("/deleteGroupe", groupeController.deleteGroupe)
    router.put("/disableGroupe", groupeController.disableGroupe)
    router.put("/updateGroupe", groupeController.updateGroupe)
    router.get("/getOneGroupe/:id", groupeController.getAsingleGroupe)
    router.get("/getAllGroupe", groupeController.getAllGroupes)
    router.put("/activateGroupe", groupeController.activateGroupe)

module.exports= router