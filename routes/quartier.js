const express=require("express")
const router= express.Router()
const quartierController= require("../controllers/quartier")

    router.post("/quartierSelectBy", quartierController.quartierSelectBy)
    //.put("/getPaysById", quartierController.getPaysById)

module.exports= router