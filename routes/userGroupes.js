const express=require("express")
const router= express.Router()
const userGroupeController= require("../controllers/userGroupes")

    router.post("/addUserGroupe", userGroupeController.addUserGroupe)
    router.post("/deletUserGroupe", userGroupeController.deleteUserGroupe)
    router.put("/disableUserGroupe", userGroupeController.disableUserGroupe)
    router.put("/updateUserGroupe", userGroupeController.updateUserGroupe)
    router.get("/getOneUserGroupe/:id", userGroupeController.getAsingleUserGroupe)
    router.get("/getAllUserGroupe", userGroupeController.getAllUserGroupes)
    router.put("/activateUserGroupe", userGroupeController.activateUserGroupe)

module.exports= router