const express=require("express")
const router= express.Router()
const prefectureController= require("../controllers/prefectures")

    router.post("/prefectureSelectBy", prefectureController.prefectureSelectBy)
    //.put("/getPaysById", prefectureController.getPaysById)

    module.exports= router