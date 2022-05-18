const express=require("express")
const router= express.Router()
const anneecibleController= require("../controllers/anneecible")

    // router.post("/anneecibleSelectBy", anneecibleController.)
    router.get("/selectAllAnneeCible", anneecibleController.getAllAnneeCibles)
    router.get("/selectByIdAnneeCible/:id", anneecibleController.anneCibleSelectById)
    router.post("/addAnneeCible", anneecibleController.addAnneeCible)
    router.put("/updateAnneeCible", anneecibleController.updateAnneeCible)
    router.delete("/deleteAnneeCible/:id", anneecibleController.deleteAnneeCible)
 module.exports= router 