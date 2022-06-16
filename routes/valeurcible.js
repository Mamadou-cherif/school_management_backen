const express=require("express")
const router= express.Router()
const valeurcibleController= require("../controllers/valeurcible")

    router.get("/selectAllValeurCible", valeurcibleController.selectAllValeurCible)

    module.exports= router 