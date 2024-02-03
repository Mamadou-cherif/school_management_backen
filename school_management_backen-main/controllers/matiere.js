const Matiere = require("../models/matiere")

function matiereSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    classeId: req.body.classeId || null,
    libelle: req.body.libelle || null,
    coefficient: req.body.coefficient || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Matiere.matiereSelectByInModel(obj)
    .then(matiere => res.status(200).json(matiere))
    .catch(error => res.status(400).json({ error }))
}

function selectAllMatiere(req, res, next) {

    Matiere.selectAllMatiere(req)
    .then(matiere => res.status(200).json(matiere))
    .catch(error => res.status(400).json(error))
}

function selectMatiereById(req, res, next) {
  const id = req.params.id
  Matiere.selectMatiereById(id)
    .then(matiere => res.status(200).json(matiere))
    .catch(error => res.status(400).json(error))
}


function addMatiere(req, res, next) {
  const matiereObj = {
    libelle: req.body.libelle,
    classeId: req.body.classeId,
    estActif: 1,
  }

  Matiere.matiereSelectByInModel(matiereObj)
    .then(matiere => {
      if (matiere.length == 0) {
        const matiereObj = {
          libelle: req.body.libelle,
          classeId: req.body.classeId,
          coefficient: req.body.coefficient,
          creationUserId: req.body.creationUserId,
        }
        Matiere.addMatiereInModel(matiereObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée matiere_insert" }));
      }
      else {
        res.status(500).json({ error: "Cette matiere existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée matiere_selectBy" }))
}


function updateMatiere(req, res, next) {
  const matiereObj = {
    libelle: req.body.libelle,
    classeId: req.body.classeId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  Matiere.matiereSelectByInModel(matiereObj)
    .then(matiere => {
      if ((matiere.length == 0) || (matiere[0].id == req.body.id)) {
        const matiereObj = {
            id: req.body.id,
            libelle: req.body.libelle,
            classeId: req.body.classeId,
            coefficient: req.body.coefficient,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        Matiere.updateMatiereInModel(matiereObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée matiere_update" }));
    
        }
      else {
        res.status(500).json({ error: "Cette matiere existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée matiere_selectBy" }))
}


//supression logique d'un axe
function deleteMatiere(req, res, next) {
  Matiere.deleteMatiereInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  matiereSelectBy,
  selectAllMatiere,
  selectMatiereById,
  addMatiere,
  updateMatiere,
  deleteMatiere
}