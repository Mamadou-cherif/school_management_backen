const Ticket = require("../models/ticket")

function ticketSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    sessionId: req.body.sessionId || null,
    classeId: req.body.classeId || null,
    libelle: req.body.libelle || null,
    typeEvaluation: req.body.typeEvaluation || null,
    observations: req.body.observations || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Ticket.ticketSelectByInModel(obj)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(400).json({ error }))
}

function selectAllTicket(req, res, next) {

    Ticket.selectAllTicket(req)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(400).json(error))
}

function selectTicketById(req, res, next) {
  const id = req.params.id
  Ticket.selectTicketById(id)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.status(400).json(error))
}


function addTicket(req, res, next) {
  const ticketObj = {
    libelle: req.body.libelle,
    classeId: req.body.classeId,
    sessionId: req.body.sessionId,
    estActif: 1,
  }

  Ticket.ticketSelectByInModel(ticketObj)
    .then(ticket => {
      if (ticket.length == 0) {
        const ticketObj = {
          sessionId: req.body.sessionId,
          classeId: req.body.classeId,
          libelle: req.body.libelle,
          typeEvaluation: req.body.typeEvaluation,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId,
        }
        Ticket.addTicketInModel(ticketObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticket_insert" }));
      }
      else {
        res.status(500).json({ error: "Ce ticket existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticket_selectBy" }))
}


function updateTicket(req, res, next) {
  const ticketObj = {
    libelle: req.body.libelle,
    classeId: req.body.classeId,
    sessionId: req.body.sessionId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  Ticket.ticketSelectByInModel(ticketObj)
    .then(ticket => {
      if ((ticket.length == 0) || (ticket[0].id == req.body.id)) {
        const ticketObj = {
            id: req.body.id,
            sessionId: req.body.sessionId,
            classeId: req.body.classeId,
            libelle: req.body.libelle,
            typeEvaluation: req.body.typeEvaluation,
            observations: req.body.observations,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        Ticket.updateTicketInModel(ticketObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticket_update" }));
    
        }
      else {
        res.status(500).json({ error: "Ce ticket existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticket_selectBy" }))
}


//supression logique d'un axe
function deleteTicket(req, res, next) {
  Ticket.deleteTicketInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  ticketSelectBy,
  selectAllTicket,
  selectTicketById,
  addTicket,
  updateTicket,
  deleteTicket
}