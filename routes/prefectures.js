const express=require("express")
const router= express.Router()
const prefectureController= require("../controllers/prefectures")

    router.post("/prefectureSelectBy", prefectureController.prefectureSelectBy)
    router.get("/selectAllPrefecture", prefectureController.selectAllPrefecture)
    router.get("/selectByIdPrefecture/:id", prefectureController.selectByIdPrefecture)
    router.post("/addPrefecture", prefectureController.addPrefecture)
    router.put("/updatePrefecture", prefectureController.updatePrefecture)
    router.delete("/deletePrefecture/:id", prefectureController.deletePrefecture)

    module.exports= router