const express=require("express")
const router= express.Router()
const paysController= require("../controllers/pays")
const ensureAuth= require("../middlewares/authenticated")
    router.get("/getAllPays", paysController.getAllPays)
    router.get("/getPaysById/:id", paysController.getPaysById)

    module.exports= router