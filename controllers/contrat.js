const Contrat = require("../models/contrat")

function contratSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        localisationId: req.body.localisationId || null,
        debut: req.body.debut || null,
        libelle: req.body.libelle || null,
        objectifs: req.body.objectifs || null,
        documentLink: req.body.documentLink || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
Contrat.contratSelectByInModel(obj)
    .then(contrat => res.status(200).json(contrat))
    .catch(error => res.status(400).json({ error }))
}





function selectAllContrat(req, res, next) {

    Contrat.selectAllContratInModel(req)
    .then(contrat => res.status(200).json(contrat))
    .catch(error => res.status(400).json(error))
}

function selectByIdContrat(req, res, next) {
  const id = req.params.id
  Contrat.selectByIdContratInModel(id)
    .then(contrat => res.status(200).json(contrat))
    .catch(error => res.status(400).json(error))
}


function addContrat(req, res, next) {
    const objTelephone={
        localisationId: req.body.localisationId,
        estActif:1,
    }
  Contrat.contratSelectByInModel(objTelephone)
    .then(contrat => {
      if (contrat.length == 0) {
        const contratObj = {
            localisationId: req.body.localisationId,
            debut: req.body.debut,
            libelle: req.body.libelle,
            documentLink: "",
            objectifs: req.body.objectifs,
            creationUserId: req.body.creationUserId,
          }
        
          Contrat.addContratInModel(contratObj)
          .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contrat_insert" }));
      
    }
      else {
        res.status(500).json({ error: "Cette contrat existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contrat_selectBy" }))
}


function updateContrat(req, res, next) {
  const contratObj = {
    localisationId: req.body.localisationId,
    estActif:1,
  }

  Contrat.contratSelectByInModel(contratObj)
    .then(contrat => {
      if ((contrat.length == 0) || (contrat[0].id == req.body.id)) {
        const contratObj = {
            id: req.body.id,
            debut: req.body.debut,
            libelle: req.body.libelle,
            documentLink: "",
            objectifs: req.body.objectifs,
            localisationId: req.body.localisationId,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }
        
          Contrat.updateContratInModel(contratObj)
          .then(() => res.status(201).json({succes: "La modification reussi avec succès"}))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contrat_insert" }));
      
        }
          else {
            res.status(500).json({ error: "Ce numéro de téléphone existe déjà pour un autre utilisateur" })
          }
    
      
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée contrat_selectBy" }))
}


//supression logique d'un axe
function deleteContrat(req, res, next) {
  Contrat.deleteContratInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  contratSelectBy,
  selectAllContrat,
  selectByIdContrat,
  addContrat,
  updateContrat,
  deleteContrat
}