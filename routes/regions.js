const express=require("express")
const router= express.Router()
const regionController= require("../controllers/regions")

    router.post("/regionSelectBy", regionController.regionSelectBy)
    //.put("/getPaysById", regionController.getPaysById)

    module.exports= router