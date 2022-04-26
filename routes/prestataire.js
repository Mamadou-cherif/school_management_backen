const express=require("express")
const router= express.Router()
const prestataireController= require("../controllers/prestataire")

    router.get("/prestataireSelectBy", prestataireController.prestataireSelectBy)
    router.get("/getAllPrestataire", prestataireController.getAllPrestataire
    )
    

    module.exports= router