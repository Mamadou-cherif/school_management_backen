const express=require("express")
const router= express.Router()
const ongletController= require("../controllers/onglets")

    router.post("/addOnglet", ongletController.addOnglet)
    router.put("/disableOnglet", ongletController.disableOnglet)
   

module.exports= router