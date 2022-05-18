const Rubrique = require("../models/rubrique")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())


function getAllRubrique(req, res, next) {

  Rubrique.getAllRubriqueInModel(req)
    .then(rubrique => res.status(200).json(rubrique))
    .catch(error => res.status(400).json(error))
}

function getRubriqueById(req, res, next) {
  const id = req.params.id
  Rubrique.getRubriqueByIdInModel(id)
    .then(rubrique => res.status(200).json(rubrique))
    .catch(error => res.status(400).json(error))
}


function addRubrique(req, res, next) {
  initRubriqueClass.libelle = req.body.libelle


  //verifie si l'utilisateur existe en base
  Rubrique.rubriquesSelectByInModel(initRubriqueClass)
    .then(Rubrique => {
      if (Rubrique.length == 0) {
        initRubriqueClass.code = req.body.code
        initRubriqueClass.creationUserId = req.body.creationUserId
        Rubrique.addRubriqueInModel(initRubriqueClass)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée rubriques_insert" }));
      }
      else {
        res.status(500).json({ error: "Ce rubrique existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée rubriques_selectBy" }))
}


function updateRubrique(req, res, next) {

  initRubriqueClass.libelle = req.body.libelle

  //verifie si la rubrique existe en base
  Rubrique.rubriquesSelectByInModel(initRubriqueClass)
    .then(Rubrique => {
      if ((Rubrique.length == 0) || (Rubrique[0].id == req.body.id)) {
        initRubriqueClass.indicatifTel = req.body.indicatifTel
        initRubriqueClass.deviseId = req.body.deviseId
        initRubriqueClass.modifUserId = req.body.modifUserId
        initRubriqueClass.modifDate = req.body.modifDate
        initRubriqueClass.id = req.body.id
        Rubrique.updateRubriqueInModel(initRubriqueClass)
          .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée Rubriques_update" }));
      }
      else {
        res.status(500).json({ error: "Cette rubrique existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée rubriques_selectBy" }))
}


//supression logique d'une rubrique
function deleteRubrique(req, res, next) {
  Rubrique.deleteRubriquesInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible car cette Rubrique appartient dans une autre table" }));
}


module.exports = {
  getAllRubrique,
  getRubriqueById,
  addRubrique,
  deleteRubrique,
  updateRubrique
}