const express= require("express")
const router= express.Router()
const checktoken= require("../middlewares/checktokenexpire")
router.get("/checktokenexpire/:token", checktoken.checktokenexpire)

module.exports= router