const express=require("express")
const router= express.Router()
const classseController= require("../controllers/classse")

    router.post("/classseSelectBy", classseController.classseSelectBy)
    router.get("/selectAllClassse", classseController.selectAllClassse)
    router.get("/selectClassseById/:id", classseController.selectClassseById)
    router.post("/addClassse", classseController.addClassse)
    router.put("/updateClassse", classseController.updateClassse)
    router.put("/disableClasse", classseController.disableClasse)
    router.delete("/deleteClassse/:id", classseController.deleteClassse)
 module.exports= router 