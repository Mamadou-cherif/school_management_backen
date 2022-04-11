const express=require("express")
const router= express.Router()
const privilegeController= require("../controllers/privileges")

    router.post("/addPrivilege", privilegeController.addPrivilege)
    router.put("/disablePrivilege", privilegeController.disablePrivilege)
    router.get("/getAllPrivileges", privilegeController.getAllPrivileges)
module.exports= router