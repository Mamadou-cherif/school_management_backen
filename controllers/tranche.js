const Tranche = require("../models/tranche")

function trancheSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    ecoleId: req.body.ecoleId || null,
    prestationId: req.body.prestationId || null,
    libelle: req.body.libelle || null,
    prestationId: req.body.prestationId || null,
    pourcentage: req.body.pourcentage || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Tranche.trancheSelectByInModel(obj)
    .then(tranche => res.status(200).json(tranche))
    .catch(error => res.status(400).json({ error }))
}

function selectAllTranche(req, res, next) {

    Tranche.selectAllTranche(req)
    .then(tranche => res.status(200).json(tranche))
    .catch(error => res.status(400).json(error))
}

function selectTrancheById(req, res, next) {
  const id = req.params.id
  Tranche.selectTrancheById(id)
    .then(tranche => res.status(200).json(tranche))
    .catch(error => res.status(400).json(error))
}


function addTranche(req, res, next) {
  const trancheObj = {
    ecoleId: req.body.ecoleId,
    libelle: req.body.libelle,
    prestationId: req.body.prestationId,
    pourcentage: req.body.pourcentage,
    creationUserId: req.body.creationUserId,
  }

  Tranche.addTrancheInModel(trancheObj)
  .then(data => res.status(201).json(data))
  .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée tranche_insert" }));

  }


function updateTranche(req, res, next) {
  const trancheObj = {
    id: req.body.id,
    ecoleId: req.body.ecoleId,
    libelle: req.body.libelle,
    prestationId: req.body.prestationId,

    prestationId: req.body.prestationId,
    pourcentage: req.body.pourcentage,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

Tranche.updateTrancheInModel(trancheObj)
.then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée tranche_update" }));
}


//supression logique d'un axe
function deleteTranche(req, res, next) {
  Tranche.deleteTrancheInModel(req.params.id)
    .then(() => res.status(200).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  trancheSelectBy,
  selectAllTranche,
  selectTrancheById,
  addTranche,
  updateTranche,
  deleteTranche
}