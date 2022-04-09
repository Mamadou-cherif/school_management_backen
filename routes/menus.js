const express=require("express")
const router= express.Router()
const menuController= require("../controllers/menus")

    router.post("/addMenu", menuController.addMenu)
    router.put("/disableMenu", menuController.disableMenu)
   

module.exports= router