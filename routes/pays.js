const express=require("express")
const router= express.Router()
const paysController= require("../controllers/pays")

    router.get("/getAllPays", paysController.getAllPays)
    router.put("/getPaysById", paysController.getPaysById)

    module.exports= router