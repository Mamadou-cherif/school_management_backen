const express = require("express")
const router = express.Router()
const userserviceController = require("../controllers/userservice")
const ensure_auth = require("../middlewares/authenticated")


router.post("/addUserService", userserviceController.addUserService)
router.post("/selectNotAffecteUserServiceId", userserviceController.selectNotAffecteUserServiceId)
router.put("/disableUserService", userserviceController.disableUserService)
router.put("/updateUserService", userserviceController.updateUserService)
router.get("/getOneUserService/:id", userserviceController.getAsingleUserService)
router.get("/getAllUserService", userserviceController.getAllUserServices)
router.post("/userserviceSelectBy", userserviceController.userserviceSelectBy)

module.exports = router