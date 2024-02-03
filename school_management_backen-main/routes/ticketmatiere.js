const express=require("express")
const router= express.Router()
const ticketmatiereController= require("../controllers/ticketmatiere")

    router.post("/ticketmatiereSelectBy", ticketmatiereController.ticketmatiereSelectBy)
    router.get("/selectAllTicketMatiere", ticketmatiereController.selectAllTicketMatiere)
    router.get("/selectTicketMatiereById/:id", ticketmatiereController.selectTicketMatiereById)
    router.post("/addTicketMatiere", ticketmatiereController.addTicketMatiere)
        router.put("/updateTicketMatiere", ticketmatiereController.updateTicketMatiere)
    router.delete("/deleteTicketMatiere/:id", ticketmatiereController.deleteTicketMatiere)
 module.exports= router 