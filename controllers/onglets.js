const Onglet = require("../models/Onglets")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initOngletClass = require("../classes/onglets")


function addOnglet(req, res, next) {
  initOngletClass.onglet.libelle = req.body.libelle
  initOngletClass.onglet.menuId = req.body.menuId
  Onglet.checkIfOngletExists(initOngletClass.onglet)
    .then(onglet => {
      if (onglet.length == 0) {
        initOngletClass.onglet.libelle = null
        initOngletClass.onglet.menuId = req.body.menuId
        initOngletClass.onglet.reference = req.body.reference
        Onglet.checkIfOngletExists(initOngletClass.onglet)
          .then(ongletReference => {
            if (ongletReference.length == 0) {
              Onglet.addOngletInModel(req)
                .then(() => res.status(201).json({ succes: "la création a reussi" }))
                .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
            }
            else {
              res.status(500).json({ error: "cette reference existe déjà" })
            }
          })
          .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectByReference" }))

      }
      else {
        res.status(500).json({ error: "cet onglet existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))
}





//supression logique d'un utilisateur
function disableOnglet(req, res, next) {
  Onglet.disableOngletInModel(req, res)
}

function getOngletByGroupe(req, res, next) {
  Onglet.getOngletByGroupeModel(req)
    .then(onglets => res.status(201).json(onglets))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
// Les onglets affectés à un groupe(dans onglet)
function getAffectesByGroupeAndMenu(req, res, next) {
  Onglet.getAffectesByGroupeAndMenuInModel(req)
    .then(onglets => res.status(200).json(onglets))
    .catch(error => res.status(400).json({ error }))
}

// renvoi tous les menuss qui ont des onglets qui sont affectés a un groupe
function getOngletsAffecteAUnGroupe(req, res, next) {
  Onglet.getOngletsAffecteAUnGroupeInModel(req)
    .then(onglets => res.status(200).json(onglets))
    .catch(error => res.status(400).json({ error }))
}

function getOngletById(req, res, next) {
  Onglet.getOngletByIdInModel(req)
    .then(onglet => res.status(200).json({ onglet }))
    .catch(error => res.status(400).json({ error }))
}

function checkIfOngletExists(req, res, next) {
  objOnglet = {
    menuId: req.body.menuId
  }
  Onglet.checkIfOngletExists(objOnglet)
    .then(onglet => res.status(200).json(onglet))
    .catch(error => res.status(400).json({ error }))
}

function updateOnglet(req, res, next) {
  console.log(req.body)
  initOngletClass.onglet.libelle = req.body.libelle
  initOngletClass.onglet.menuId = req.body.menuId


  // initMenuClass.Menu.observations= req.body.observations
  //verifie si l'utilisateur existe en base
  Onglet.checkIfOngletExists(initOngletClass.onglet)
    .then(onglet => {
      if (onglet.length == 0 || (onglet[0].id == req.body.id)) {
        Onglet.updateOngletInModel(req)
          .then(() => res.status(201).json({ succes: "la modification a reussi" }))
          .catch(() => res.status(400).json({ error: "erreur de la procédure stocké de modification" }));
      }
      else {
        res.status(500).json({ error: "Cet onglet existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))
}

function getOngletByUserReference(req, res, next) {

  const onglet = {
    userId: req.body.userId,
    referenceMenu: req.body.referenceMenu
  }

  Onglet.getOngletByUserReferenceMenuInModel(onglet)
    .then(onglets => res.status(200).json(onglets))
    .catch(() => res.status(400).json({ error: "vous avez une erreur!" }))
}

module.exports = {
  updateOnglet,
  getOngletByGroupe,
  disableOnglet,
  addOnglet,
  getAffectesByGroupeAndMenu,
  getOngletsAffecteAUnGroupe,
  getOngletById,
  checkIfOngletExists,
  getOngletByUserReference
}