const Prestation = require("../models/prestation")

function prestationSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    libelle: req.body.libelle || null,
    modePaiement: req.body.modePaiement || null,
    duree: req.body.duree || null,
    uniteDuree: req.body.uniteDuree || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Prestation.prestationSelectByInModel(obj)
    .then(prestation => res.status(200).json(prestation))
    .catch(error => res.status(400).json({ error }))
}

function selectAllPrestation(req, res, next) {
    Prestation.selectAllPrestation(req)
    .then(prestation => res.status(200).json(prestation))
    .catch(error => res.status(400).json(error))
}

function selectPrestationById(req, res, next) {
  const id = req.params.id
  Prestation.selectPrestationById(id)
    .then(prestation => res.status(200).json(prestation))
    .catch(error => res.status(400).json(error))
}


function addPrestation(req, res, next) {
  const prestationObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  Prestation.prestationSelectByInModel(prestationObj)
    .then(data => {
      if (data.length == 0) {
        const prestationObj = {
          libelle: req.body.libelle ,
          modePaiement: req.body.modePaiement ,
          duree: req.body.duree ,
          uniteDuree: req.body.uniteDuree ,
          creationUserId: req.body.creationUserId,
        }
      
        Prestation.addPrestationInModel(prestationObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prestation_insert" }));
      }
      else {
        res.status(500).json({ error: "Cette prestation existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prestations_selectBy" }))
  }


function updatePrestation(req, res, next) {
  const prestationObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  Prestation.prestationSelectByInModel(prestationObj)
    .then(data => {
      if (data.length == 0 || data[0].id == req.body.id) {
        const prestationObj = {
          id: req.body.id,
          libelle: req.body.libelle ,
          modePaiement: req.body.modePaiement ,
          duree: req.body.duree ,
          uniteDuree: req.body.uniteDuree ,
          modifUserId: req.body.modifUserId,
          modifDate: req.body.modifDate,
        }
      
      Prestation.updatePrestationInModel(prestationObj)
      .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
      .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prestation_update" }));
      }
      else {
        res.status(500).json({ error: "Ce libelle existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prestations_selectBy" }))


  }

  function disablePrestation(req, res, next){
    const obj={
      id: req.body.id,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
    Prestation.disablePrestationInModel(obj)
    .then(()=> res.status(200).json({succes: "La suppression a reussi"}))
    .catch(error => res.status(400).json(error))
  
  }

//supression logique d'un axe
function deletePrestation(req, res, next) {
  Prestation.deletePrestationInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  prestationSelectBy,
  selectAllPrestation,
  selectPrestationById,
  addPrestation,
  disablePrestation,
  updatePrestation,
  deletePrestation
}