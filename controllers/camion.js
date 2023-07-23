const Camion = require("../models/camion")

function camionSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        libelle: req.body.libelle || null,
        nom: req.body.nom || null,
        prenoms: req.body.prenoms || null,
        telephone: req.body.telephone || null,
        libelle: req.body.libelle || null,
        contratId: req.body.contratId || null,
        flotteId: req.body.flotteId || null,
        typeFonctionId: req.body.typeFonctionId || null,
        statut: req.body.statut || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
Camion.camionSelectByInModel(obj)
    .then(camion => res.status(200).json(camion))
    .catch(error => res.status(400).json({ error }))
}

function selectAllCamion(req, res, next) {

    Camion.selectAllCamionInModel(req)
    .then(camion => res.status(200).json(camion))
    .catch(error => res.status(400).json(error))
}

function selectByIdCamion(req, res, next) {
  const id = req.params.id
  Camion.selectByIdCamionInModel(id)
    .then(camion => res.status(200).json(camion))
    .catch(error => res.status(400).json(error))
}


function addCamion(req, res, next) {
  
    const camionObj = {
        immatriculation: req.body.immatriculation,
        estActif:1,
      }
    
      //verifie si le numero de téléphone existe en base
      Camion.camionSelectByInModel(camionObj)
        .then(camion => {
            
          if ((camion.length == 0)) {
                const objRadar={
                    flotteId: req.body.flotteId,
                    radar: req.body.radar,
                    estActif:1,
                }
                Camion.camionSelectByInModel(objRadar)
                .then(camion1 => {
                  if (camion1.length == 0 || req.body.radar== '') {
                    const camionObj = {
                        flotteId: req.body.flotteId,
                        titulaire: req.body.titulaire,
                        capaciteThBenne: req.body.capaciteThBenne,
                        immatriculation: req.body.immatriculation,
                        radar: req.body.radar,
                        libelle: req.body.libelle,
                        creationUserId: req.body.creationUserId,
                      }
                    
                      Camion.addCamionInModel(camionObj)
                      .then(data => {
                        res.status(201).json(data)
                      })
                      .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_insert" }));
                  
                    }
                  else {
                    res.status(500).json({ error: "Cette numero de radar existe déjà pour un autre camion" })
                  }
                })
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_selectBy" }))
              }
              else {
                res.status(500).json({ error: "numero matricule existant" })
              }
        
          
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_selectBy" }))
}


function updateCamion(req, res, next) {
  const camionObj = {
    immatriculation: req.body.immatriculation,
    estActif:1,
  }

  //verifie si le numero de téléphone existe en base
  Camion.camionSelectByInModel(camionObj)
    .then(camion => {
        
      if ((camion.length == 0) || (camion[0].id == req.body.id)) {
            const objRadar={
                flotteId: req.body.flotteId,
                radar: req.body.radar,
                estActif:1,
            }
            Camion.camionSelectByInModel(objRadar)
            .then(camion1 => {

              if ((camion1.length == 0) || (camion1[0].id == req.body.id || req.body.radar== '')) {
                const camionObj = {
                    id: req.body.id,
                    libelle: req.body.libelle,
                    flotteId: req.body.flotteId,
                    titulaire: req.body.titulaire,
                    capaciteThBenne: req.body.capaciteThBenne,
                    immatriculation: req.body.immatriculation,
                    radar: req.body.radar,
                    modifUserId: req.body.modifUserId,
                    modifDate: req.body.modifDate,
                  }
                
                  Camion.updateCamionInModel(camionObj)
                  .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
                  .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_insert" }));
                
                }
              else {
                res.status(500).json({ error: "Cette numero de radar existe déjà pour un autre camion" })
              }
            })
            .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_selectBy" }))
          }
          else {
            res.status(500).json({ error: "numero matricule existant" })
          }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée camion_selectBy" }))
}


function getCamionInSiteByFlotteId(req, res, next) {
  const obj={
    flotteId: req.body.flotteId,
    siteId: req.body.siteId,
  }
  Camion.getCamionInSiteByFlotteId(obj)
    .then(camion => res.status(201).json(camion))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}
//supression logique d'un axe
function deleteCamion(req, res, next) {
  Camion.deleteCamionInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  camionSelectBy,
  getCamionInSiteByFlotteId,
  selectAllCamion,
  selectByIdCamion,
  addCamion,
  updateCamion,
  deleteCamion
}