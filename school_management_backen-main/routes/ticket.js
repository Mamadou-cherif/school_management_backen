const express=require("express")
const router= express.Router()
const ticketController= require("../controllers/ticket")

    router.post("/ticketSelectBy", ticketController.ticketSelectBy)
    router.get("/selectAllTicket", ticketController.selectAllTicket)
    router.get("/selectTicketById/:id", ticketController.selectTicketById)
    router.post("/addTicket", ticketController.addTicket)
        router.put("/updateTicket", ticketController.updateTicket)
    router.delete("/deleteTicket/:id", ticketController.deleteTicket)
 module.exports= router 