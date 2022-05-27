const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")
const md_auth = require("../middlewares/authenticated")

router.post("/addUser", userController.addUser)
router.post("/login", userController.login)
router.delete("/deleteUser", userController.deleteUser)
router.put("/disableUser", userController.disableUser)
router.put("/updateUser", userController.updateUser)
router.get("/getOneUser/:id", userController.getAsingleUser)
router.post("/getAllUser", userController.getAllUsers)
router.post("/getAffecteByGroup", userController.getAffecteByGroup)
router.post("/getNonAffecteByGroup", userController.getNonAffecteByGroup)
router.put("/activateUser", userController.activateUser)
router.put("/updateUserPwd", userController.updatePassword)
router.post("/userSelectBy", userController.UserSelectBy)
module.exports = router

