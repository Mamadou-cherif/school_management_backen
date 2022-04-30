const express=require("express")
const router= express.Router()
const groupeController= require("../controllers/groupes")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addGroupe",[ensure_auth.ensureAuth], groupeController.addGroupe)
    router.delete("/deleteGroupe", groupeController.deleteGroupe) 
    router.put("/disableGroupe", groupeController.disableGroupe)
    router.put("/updateGroupe", groupeController.updateGroupe)
    router.get("/getOneGroupe/:id", groupeController.getAsingleGroupe)
    router.post("/getAllGroupe", groupeController.getAllGroupes)
    router.put("/activateGroupe", groupeController.activateGroupe)

module.exports= router