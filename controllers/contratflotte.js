const ContratFlotte = require("../models/contratflotte")

function contratflotteSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        contratId: req.body.contratId || null,
        flotteId: req.body.flotteId || null,
        observations: req.body.observations || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
ContratFlotte.contratflotteSelectByInModel(obj)
    .then(contratflotte => res.status(200).json(contratflotte))
    .catch(error => res.status(400).json({ error }))
}




function selectAllContratFlotte(req, res, next) {

    ContratFlotte.selectAllContratFlotteInModel(req)
    .then(contratflotte => res.status(200).json(contratflotte))
    .catch(error => res.status(400).json(error))
}

function selectByIdContratFlotte(req, res, next) {
  const id = req.params.id
  ContratFlotte.selectByIdContratFlotteInModel(id)
    .then(contratflotte => res.status(200).json(contratflotte))
    .catch(error => res.status(400).json(error))
}


function addContratFlotte(req, res, next) {
    const obj={
        contratId: req.body.contratId,
        flotteId: req.body.flotteId,
        estActif:1,
    }
  ContratFlotte.contratflotteSelectByInModel(obj)
    .then(contratflotte => {
      if (contratflotte.length == 0) {
        const contratflotteObj = {
          contratId: req.body.contratId,
          flotteId: req.body.flotteId,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId,
        }
        ContratFlotte.addContratFlotteInModel(contratflotteObj)
        .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contratflotte_insert" }));
      
      }
      else {
        res.status(500).json({ error: "Cette flotte est déjà rattaché à ce site" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contratflotte_selectBy" }))

  }


function updateContratFlotte(req, res, next) {
  const obj={
    contratId: req.body.contratId,
    flotteId: req.body.flotteId,
    estActif:1,
}
ContratFlotte.contratflotteSelectByInModel(obj)
.then(contratflotte => {
  if (contratflotte.length == 0 || contratflotte[0].id== req.body.id) {
    const contratflotteObj = {
      id: req.body.id,
      contratId: req.body.contratId,
      flotteId: req.body.flotteId,
      observations: req.body.observations,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    ContratFlotte.updateContratFlotteInModel(contratflotteObj)
    .then(() => res.status(201).json({succes: "modification reussie avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contratflotte_insert" }));
  
  }
  else {
    res.status(500).json({ error: "Cette flotte est déjà rattaché à ce site" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contratflotte_selectBy" }))


  }


//supression logique d'un axe
function deleteContratFlotte(req, res, next) {
  ContratFlotte.deleteContratFlotteInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  contratflotteSelectBy,
  selectAllContratFlotte,
  selectByIdContratFlotte,
  addContratFlotte,
  updateContratFlotte,
  deleteContratFlotte
}