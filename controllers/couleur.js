const Couleur = require("../models/couleur")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
const initCouleurClass = require("../classes/couleur")

function getAllCouleur(req, res, next) {

  Couleur.getAllCouleurInModel(req)
    .then(couleur => res.status(200).json(couleur))
    .catch(error => res.status(400).json(error))
}

function getCouleurById(req, res, next) {
  const id = req.params.id
  Couleur.getCouleurByIdInModel(id)
    .then(couleur => res.status(200).json(couleur))
    .catch(error => res.status(400).json(error))
}


function addCouleur(req, res, next) {
  const objCouleur = {
    libelle: req.body.libelle,
    estActif: 1
  }

  //verifie si l'utilisateur existe en base
  Couleur.couleurSelectByInModel(objCouleur)
    .then(couleur => {
      if (couleur.length == 0) {

        initCouleurClass.libelle = req.body.libelle
        initCouleurClass.code = req.body.code
        initCouleurClass.creationUserId = req.body.creationUserId


        Couleur.addCouleurInModel(initCouleurClass)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée couleurs_insert" }));
      }
      else {
        res.status(500).json({ error: "Ce rubrique existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée couleurs_insert" }))
}


function updateCouleur(req, res, next) {
  const objCouleur = {
    libelle: req.body.libelle,
    estActif: 1
  }
  //verifie si la rubrique existe en base
  console.log("init", objCouleur);
  Couleur.couleurSelectByInModel(objCouleur)
    .then(couleur => {
      console.log("cou", couleur);
      if ((couleur.length == 0) || (couleur[0].id == req.body.id)) {
        initCouleurClass.id = req.body.id
        initCouleurClass.libelle = req.body.libelle
        initCouleurClass.code = req.body.code
        initCouleurClass.modifUserId = req.body.modifUserId
        initCouleurClass.modifDate = req.body.modifDate

        Couleur.updateCouleurInModel(initCouleurClass)
          .then(() => res.status(200).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée couleurs_update" }));
      }
      else {
        res.status(500).json({ error: "Cette couleur existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée couleurs_selectBy" }))
}


//supression logique d'une rubrique
function disableCouleur(req, res, next) {
  Couleur.disableCouleurInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible " }));
}

function deleteCouleur(req, res, next) {
  Couleur.deleteCouleurInModel(req.params.id)
    .then(() => res.status(200).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible car cette couleur appartient dans une autre table" }));
}


module.exports = {
  getAllCouleur,
  getCouleurById,
  addCouleur,
  disableCouleur,
  updateCouleur,
  deleteCouleur
}