const express=require("express")
const router= express.Router()
const communeController= require("../controllers/commune")

    router.post("/communeSelectBy", communeController.communeSelectBy)

    module.exports= router