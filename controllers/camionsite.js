const CamionSite = require("../models/camionsite")

function camionsiteSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        siteId: req.body.siteId || null,
        camionId: req.body.camionId || null,
        observations: req.body.observations || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
CamionSite.camionsiteSelectByInModel(obj)
    .then(camionsite => res.status(200).json(camionsite))
    .catch(error => res.status(400).json({ error }))
}




function selectAllCamionSite(req, res, next) {

    CamionSite.selectAllCamionSiteInModel(req)
    .then(camionsite => res.status(200).json(camionsite))
    .catch(error => res.status(400).json(error))
}

function selectByIdCamionSite(req, res, next) {
  const id = req.params.id
  CamionSite.selectByIdCamionSiteInModel(id)
    .then(camionsite => res.status(200).json(camionsite))
    .catch(error => res.status(400).json(error))
}


function addCamionSite(req, res, next) {
    const obj={
      siteId: req.body.siteId,
      camionId: req.body.camionId,
        estActif:1,
    }
  CamionSite.camionsiteSelectByInModel(obj)
    .then(camionsite => {
      if (camionsite.length == 0) {
        const camionsiteObj = {
          siteId: req.body.siteId,
          camionId: req.body.camionId,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId,
        }
      
        CamionSite.addCamionSiteInModel(camionsiteObj)
        .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionsite_insert" }));
      
      }
      else {
        res.status(500).json({ error: "ce camionest déjà rattaché à un autre" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionsite_selectBy" }))

  }


function updateCamionSite(req, res, next) {
  const obj={
    siteId: req.body.siteId,
    camionId: req.body.camionId,
    estActif:1,
}
CamionSite.camionsiteSelectByInModel(obj)
.then(camionsite => {
  if (camionsite.length == 0) {
    const camionsiteObj = {
      id: req.body.id,
      siteId: req.body.siteId,
      camionId: req.body.camionId,
      observations: req.body.observations,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    CamionSite.updateCamionSiteInModel(camionsiteObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionsite_insert" }));
  
  }
  else {
    res.status(500).json({ error: "ce camionest déjà rattaché à un autre site" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camionsite_selectBy" }))


  }


//supression logique d'un axe
function deleteCamionSite(req, res, next) {
  CamionSite.deleteCamionSiteInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  camionsiteSelectBy,
  selectAllCamionSite,
  selectByIdCamionSite,
  addCamionSite,
  updateCamionSite,
  deleteCamionSite
}