const express=require("express")
const router= express.Router()
const communesController= require("../controllers/commune")

    router.get("/getAllCommunes", communesController.getAllCommune)
    router.post("/getCommunesById", communesController.getCommuneById)

    module.exports= router