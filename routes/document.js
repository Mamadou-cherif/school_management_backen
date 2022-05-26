const express=require("express")
const router= express.Router()
const documentsController= require("../controllers/document")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/documentsSelectBy", documentsController.documentsSelectBy)

module.exports= router