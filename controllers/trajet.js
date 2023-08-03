const Trajet = require("../models/trajet")

function trajetSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        contratId: req.body.contratId || null,
        dechargement: req.body.dechargement || null,
        distance: req.body.distance || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
Trajet.trajetSelectByInModel(obj)
    .then(trajet => res.status(200).json(trajet))
    .catch(error => res.status(400).json({ error }))
}


function getDistanceByContratIdAndChargementId(req, res, next) {
  const obj={
    contratId: req.body.contratId,
    dechargement: req.body.dechargement
  }
  Trajet.getDistanceByContratIdAndChargementId(obj)
  .then(trajet => res.status(200).json(trajet))
  .catch(error => res.status(400).json(error))
}

function selectAllTrajet(req, res, next) {

    Trajet.selectAllTrajetInModel(req)
    .then(trajet => res.status(200).json(trajet))
    .catch(error => res.status(400).json(error))
}

function selectByIdTrajet(req, res, next) {
  const id = req.params.id
  Trajet.selectByIdTrajetInModel(id)
    .then(trajet => res.status(200).json(trajet))
    .catch(error => res.status(400).json(error))
}


function addTrajet(req, res, next) {
    const obj={
      contratId: req.body.contratId,
      dechargement: req.body.dechargement,
        estActif:1,
    }
  Trajet.trajetSelectByInModel(obj)
    .then(trajet => {
      if (trajet.length == 0) {
        const trajetObj = {
            contratId: req.body.contratId,
            dechargement: req.body.dechargement,
            distance: req.body.distance,
            creationUserId: req.body.creationUserId,
        }
      
        Trajet.addTrajetInModel(trajetObj)
        .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée trajet_insert" }));
      
      }
      else {
        res.status(500).json({ error: "dupplicata de trajet" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée trajet_selectBy" }))

  }


function updateTrajet(req, res, next) {
  const obj={
    contratId: req.body.contratId ,
    dechargement: req.body.dechargement,
    estActif:1,
}
Trajet.trajetSelectByInModel(obj)
.then(trajet => {
  if (trajet.length == 0 || trajet[0].id== req.body.id) {
    const trajetObj = {
      id: req.body.id,
      contratId: req.body.contratId,
      dechargement: req.body.dechargement,
      distance: req.body.distance,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    Trajet.updateTrajetInModel(trajetObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée trajet_insert" }));
  }
  else {
    res.status(500).json({ error: "Dupplicata du trajet" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée trajet_selectBy" }))


  }


//supression logique d'un axe
function deleteTrajet(req, res, next) {
  Trajet.deleteTrajetInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  getDistanceByContratIdAndChargementId,
  trajetSelectBy,
  selectAllTrajet,
  selectByIdTrajet,
  addTrajet,
  updateTrajet,
  deleteTrajet
}