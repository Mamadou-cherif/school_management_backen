const CamionChauffeur = require("../models/camionchauffeur")

function camionchauffeurSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        chauffeurId: req.body.chauffeurId || null,
        camionId: req.body.camionId || null,
        estTitulaire: req.body.estTitulaire || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
CamionChauffeur.camionchauffeurSelectByInModel(obj)
    .then(camionchauffeur => res.status(200).json(camionchauffeur))
    .catch(error => res.status(400).json({ error }))
}




function selectAllCamionChauffeur(req, res, next) {

    CamionChauffeur.selectAllCamionChauffeurInModel(req)
    .then(camionchauffeur => res.status(200).json(camionchauffeur))
    .catch(error => res.status(400).json(error))
}

function selectByIdCamionChauffeur(req, res, next) {
  const id = req.params.id
  CamionChauffeur.selectByIdCamionChauffeurInModel(id)
    .then(camionchauffeur => res.status(200).json(camionchauffeur))
    .catch(error => res.status(400).json(error))
}


function addCamionChauffeur(req, res, next) {
    const obj={
        chauffeurId: req.body.chauffeurId,
        estActif:1,
    }
  CamionChauffeur.camionchauffeurSelectByInModel(obj)
    .then(camionchauffeur => {
      if (camionchauffeur.length == 0) {
        const camionchauffeurObj = {
          chauffeurId: req.body.chauffeurId,
          camionId: req.body.camionId,
          estTitulaire: req.body.estTitulaire,
          creationUserId: req.body.creationUserId,
        }
      
        CamionChauffeur.addCamionChauffeurInModel(camionchauffeurObj)
        .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionchauffeur_insert" }));
      
      }
      else {
        res.status(500).json({ error: "Cette chauffeur est déjà rattaché à un autre" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionchauffeur_selectBy" }))

  }


function updateCamionChauffeur(req, res, next) {
  const obj={
    chauffeurId: req.body.chauffeurId,
    estActif:1,
}
CamionChauffeur.camionchauffeurSelectByInModel(obj)
.then(camionchauffeur => {
  if (camionchauffeur.length == 0) {
    const camionchauffeurObj = {
      id: req.body.id,
      chauffeurId: req.body.chauffeurId,
      camionId: req.body.camionId,
      estTitulaire: req.body.estTitulaire,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    CamionChauffeur.updateCamionChauffeurInModel(camionchauffeurObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionchauffeur_insert" }));
  
  }
  else {
    res.status(500).json({ error: "Cette chauffeur est déjà rattaché à un autre" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionchauffeur_selectBy" }))


  }


//supression logique d'un axe
function deleteCamionChauffeur(req, res, next) {
  CamionChauffeur.deleteCamionChauffeurInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  camionchauffeurSelectBy,
  selectAllCamionChauffeur,
  selectByIdCamionChauffeur,
  addCamionChauffeur,
  updateCamionChauffeur,
  deleteCamionChauffeur
}