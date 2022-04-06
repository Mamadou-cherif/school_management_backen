const express=require("express")
const router= express.Router()
const userController= require("../controllers/user")

    router.post("/addUser", userController.addUser)
    router.post("/login", userController.login)
    router.delete("/deleteUser", userController.deleteUser)
    router.put("/disableUser", userController.disableUser)
    router.put("/updateUser", userController.updateUser)
    router.get("/getOneUser/:id", userController.getAsingleUser)
    router.get("/getAllUser", userController.getAllUsers)
    router.put("/activateUser", userController.activateUser)


module.exports= router