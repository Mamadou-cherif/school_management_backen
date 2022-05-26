const express=require("express")
const router= express.Router()
const privilegeController= require("../controllers/privileges")

    router.post("/addPrivilege", privilegeController.addPrivilege)
    router.post("/getCountPrivilegeForActionOnglet", privilegeController.getCountPrivilegeForActionOnglet)
    router.put("/disablePrivilege", privilegeController.disablePrivilege)
    router.get("/getAllPrivileges", privilegeController.getAllPrivileges)
    router.post("/deletePrivilege", privilegeController.deletePrivilege)
    router.post("/checkIfPrivilegeExists", privilegeController.checkIfPrivilegeExists)
module.exports= router