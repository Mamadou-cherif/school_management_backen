const TicketMatiere = require("../models/ticketmatiere")

function ticketmatiereSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    ticketId: req.body.ticketId || null,
    matiereId: req.body.matiereId || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
TicketMatiere.ticket_matiereSelectByInModel(obj)
    .then(ticketmatiere => res.status(200).json(ticketmatiere))
    .catch(error => res.status(400).json({ error }))
}

function selectAllTicketMatiere(req, res, next) {

    TicketMatiere.selectAllTicketMatiere(req)
    .then(ticketmatiere => res.status(200).json(ticketmatiere))
    .catch(error => res.status(400).json(error))
}

function selectTicketMatiereById(req, res, next) {
  const id = req.params.id
  TicketMatiere.selectTicketMatiereById(id)
    .then(ticketmatiere => res.status(200).json(ticketmatiere))
    .catch(error => res.status(400).json(error))
}


function addTicketMatiere(req, res, next) {
  const ticketmatiereObj = {
    ticketId: req.body.ticketId,
    matiereId: req.body.matiereId,
    estActif: 1,
  }

  TicketMatiere.ticket_matiereSelectByInModel(ticketmatiereObj)
    .then(ticketmatiere => {
      if (ticketmatiere.length == 0) {
        const ticketmatiereObj = {
          ticketId: req.body.ticketId,
          matiereId: req.body.matiereId,
          creationUserId: req.body.creationUserId,
        }
        TicketMatiere.addTicketMatiereInModel(ticketmatiereObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticketmatiere_insert" }));
      }
      else {
        res.status(500).json({ error: "Ce ticketmatiere existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticketmatiere_selectBy" }))
}


function updateTicketMatiere(req, res, next) {
  const ticketmatiereObj = {
    ticketId: req.body.ticketId,
    matiereId: req.body.matiereId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  TicketMatiere.ticket_matiereSelectByInModel(ticketmatiereObj)
    .then(ticketmatiere => {
      if ((ticketmatiere.length == 0) || (ticketmatiere[0].id == req.body.id)) {
        const ticketmatiereObj = {
            id: req.body.id,
            ticketId: req.body.ticketId,
            matiereId: req.body.matiereId,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        TicketMatiere.updateTicketMatiereInModel(ticketmatiereObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticketmatiere_update" }));
    
        }
      else {
        res.status(500).json({ error: "Ce ticketmatiere existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ticketmatiere_selectBy" }))
}


//supression logique d'un axe
function deleteTicketMatiere(req, res, next) {
  TicketMatiere.deleteTicketMatiereInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  ticketmatiereSelectBy,
  selectAllTicketMatiere,
  selectTicketMatiereById,
  addTicketMatiere,
  updateTicketMatiere,
  deleteTicketMatiere
}