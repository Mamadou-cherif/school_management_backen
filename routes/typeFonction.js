const express=require("express")
const router= express.Router()
const typeFonctionController= require("../controllers/typeFonction")

    router.post("/typeFonctionSelectBy", typeFonctionController.typefonctionSelectBy)
    router.get("/selectAllTypeFonction", typeFonctionController.selectAlltypeFonction)
    router.get("/selectByIdTypeFonction/:id", typeFonctionController.selectByIdtypeFonction)
    router.post("/addTypeFonction", typeFonctionController.addtypeFonction)
    router.put("/updateTypeFonction", typeFonctionController.updatetypeFonction)
    router.delete("/deleteTypeFonction/:id", typeFonctionController.deletetypeFonction)

module.exports= router 