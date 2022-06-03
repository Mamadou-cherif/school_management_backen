const Intervention = require("../models/intervention")

const initInterventionClass = require("../classes/intervention")

function interventionSelectBy(req, res, next) {
  const intervention = {
    id: req.body.id || null,
    prestataireId: req.body.prestataireId || null,
    projetId: req.body.projetId || null,
    categorie: req.body.categorie || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }

  Intervention.InterventionSelectByInModel(intervention)
    .then(intervention => res.status(200).json(intervention))
    .catch(error => res.status(400).json({ error }))

}


function addIntervention(req, res, next) {
  const interventionObj = {
    prestataireId: req.body.prestataireId,
    estActif: 1,

  }
  Intervention.InterventionSelectByInModel(interventionObj)
    .then(intervention => {

      if ((intervention.length == 0)) {
        const interventionObj = {
          id: req.body.id || null,
          prestataireId: req.body.prestataireId || null,
          projetId: req.body.projetId || null,
          categorie: req.body.categorie || null,
          observations: req.body.observations || null,
          estActif: 1,
          creationDate: req.body.creationDate || null,
          creationUserId: req.body.creationUserId || null,
          modifDate: req.body.modifDate || null,
          modifUserId: req.body.modifUserId || null,
          debut: req.body.debut || null,
          fin: req.body.fin || null
        }
        Intervention.addInterventionInModel(interventionObj)
          .then(() => res.status(200).json({ succes: "L'ajout a réussi!" }))
          .catch(error => console.log(error))
      }
      else {
        res.status(400).json({ error: "duplicata du prestataire" })
      }
    })
    .catch(error => res.status(400).json(error))



}



function deleteIntervention(req, res, next) {

}

//supression logique d'un utilisateur
function disableIntervention(req, res, next) {

  const interventionObj = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Intervention.disableInterventionInModel(interventionObj)
    .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de suppression" }));
}





function updateIntervention(req, res, next) {
  const interventionObj = {
    prestataireId: req.body.prestataireId,
    estActif: 1
  }
  Intervention.InterventionSelectByInModel(interventionObj)
    .then(intervention => {

      if ((intervention.length == 0) || (intervention[0].id == req.body.id)) {
        const interventionObj = {
          id: req.body.id || null,
          prestataireId: req.body.prestataireId || null,
          projetId: req.body.projetId || null,
          categorie: req.body.categorie || null,
          observations: req.body.observations || null,
          estActif: 1,
          creationDate: req.body.creationDate || null,
          creationUserId: req.body.creationUserId || null,
          modifDate: req.body.modifDate || null,
          modifUserId: req.body.modifUserId || null,
          debut: req.body.debut || null,
          fin: req.body.fin || null
        }
        Intervention.updateInterventionInModel(interventionObj)
          .then(() => res.status(200).json({ succes: "La modification a réussi!" }))
          .catch(() => res.status(400).json({ error: "Echec de la modification!" }))
      }
      else {
        res.status(400).json({ error: "duplicata du prestataire" })
      }
    })
    .catch(error => res.status(400).json(error))



}
function getAsingleIntervention(req, res, next) {
  const id = req.params.id
  Intervention.getAsingleInterventionInModel(id)
    .then(intervention => res.status(200).json(intervention))
    .catch(error => res.status(400).json(error))
}


function getAllInterventions(req, res, next) {

}




module.exports = {
  interventionSelectBy,
  disableIntervention,
  deleteIntervention,
  addIntervention,
  updateIntervention,
  getAsingleIntervention,
  getAllInterventions,
}

