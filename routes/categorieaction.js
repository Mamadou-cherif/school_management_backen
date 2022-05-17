const express=require("express")
const router= express.Router()
const categorieactionController= require("../controllers/categorieaction")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addCategorieAction", categorieactionController.addCategorieAction)
    router.put("/disableCategorieAction", categorieactionController.disableCategorieAction)
    router.put("/updateCategorieAction", categorieactionController.updateCategorieAction)
    router.get("/getOneCategorieAction/:id", categorieactionController.getAsingleCategorieAction)
    router.post("/getAllCategorieAction", categorieactionController.getAllCategorieActions)
    router.delete("/deleteCategorieAction/:id", categorieactionController.deleteCategorieAction)
module.exports= router