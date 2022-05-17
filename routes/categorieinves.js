const express=require("express")
const router= express.Router()
const categorieinvestController= require("../controllers/categorieinves")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addCategorieInvest", categorieinvestController.addCategorieInvest)
    router.put("/disableCategorieInvest", categorieinvestController.disableCategorieInvest)
    router.put("/updateCategorieInvest", categorieinvestController.updateCategorieInvest)
    router.get("/getOneCategorieInvest/:id", categorieinvestController.getAsingleCategorieInvest)
    router.post("/getAllCategorieInvest", categorieinvestController.getAllCategorieInvests)
    router.delete("/deleteCategorieInvest/:id", categorieinvestController.deleteCategorieInvest)
module.exports= router