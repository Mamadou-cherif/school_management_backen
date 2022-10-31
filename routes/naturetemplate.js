const express=require("express")
const router= express.Router()
const naturetemplateController= require("../controllers/naturetemplate")

    router.post("/addNatureTemplate", naturetemplateController.addNatureTemplate)
    router.put("/disableNatureTemplate", naturetemplateController.disableNatureTemplate)
    router.delete("/deleteNatureTemplate/:id", naturetemplateController.deleteNatureTemplate)
    router.put("/updateNatureTemplate", naturetemplateController.updateNatureTemplate)
    router.get("/getOneNatureTemplate/:id", naturetemplateController.getAsingleNatureTemplate)
    router.post("/getAllNatureTemplate", naturetemplateController.getAllNatureTemplate)
    router.post("/naturetemplateSelectBy", naturetemplateController.naturetemplateSelectBy)

module.exports= router