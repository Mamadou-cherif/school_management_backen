const express=require("express") 
const router= express.Router()
const serviceconcerneController= require("../controllers/serviceconcerne")
const ensure_auth= require("../middlewares/authenticated")

    router.post("/addServiceConcerne", serviceconcerneController.addServiceConcerne)
    router.put("/disableServiceConcerne", serviceconcerneController.disableServiceConcerne)
    router.put("/updateServiceConcerne", serviceconcerneController.updateServiceConcerne)
    router.get("/getOneServiceConcerne/:id", serviceconcerneController.getAsingleServiceConcerne)
    router.post("/getAllServiceConcerne", serviceconcerneController.getAllServiceConcernes)

module.exports= router