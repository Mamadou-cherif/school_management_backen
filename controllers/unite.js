const Unite = require("../models/unite")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initUniteClass = require("../classes/unite")

function uniteSelectBy(req, res, next) {
  initUniteClass.prefectureId = req.body.prefectureId
  Unite.uniteSelectByInModel(initUniteClass)
    .then(unites => res.status(200).json(unites))
    .catch(error => res.status(400).json({ error }))
}

function selectAllUnite(req, res, next) {

  Unite.selectAllUniteInModel(req)
    .then(unites => res.status(200).json(unites))
    .catch(error => res.status(400).json(error))
}

function selectByIdUnite(req, res, next) {
  const id = req.params.id
  Unite.selectByIdUniteInModel(id)
    .then(unite => res.status(200).json(unite))
    .catch(error => res.status(400).json(error))
}


function addUnite(req, res, next) {
  const uniteObj = {
    libelle: req.body.libelle,
    estActif: 1,

  }
  Unite.checkIfUniteExists(uniteObj)
    .then(unites => {

      if (unites.length == 0) {
        const uniteObj = {
          symbole: req.body.symbole,
          estActif: 1
        }
        Unite.checkIfUniteExists(uniteObj)
          .then(unites => {
            console.log(unites)
            if (unites.length == 0) {
              initUniteClass.libelle = req.body.libelle
              initUniteClass.symbole = req.body.symbole
              initUniteClass.creationUserId = req.body.creationUserId
              Unite.addUniteInModel(initUniteClass)
                .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_insert" }));
            }
            else {
              res.status(500).json({ error: "Ce symbole existe déjà" })
            }
          })
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_selectBy" }))
      }
      else {
        res.status(500).json({ error: "Cette unité existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_selectBy" }))
}





function updateUnite(req, res, next) {
  const uniteObj = {
    id: null,
    libelle: req.body.libelle,
    symbole: null,
    estActif: 1
  }


  //verifie si l'utilisateur existe en base
  Unite.checkIfUniteExists(uniteObj)
    .then(unites => {

      if ((unites.length == 0) || (unites[0].id == req.body.id)) {
        const uniteObj = {
          symbole: req.body.symbole,
          estActif: 1,
        }

        Unite.checkIfUniteExists(uniteObj)
          .then(symboles => {
            if ((symboles.length == 0) || (symboles[0].id == req.body.id)) {
              initUniteClass.libelle = req.body.libelle
              initUniteClass.symbole = req.body.symbole
              initUniteClass.modifUserId = req.body.modifUserId
              initUniteClass.modifDate = req.body.modifDate
              initUniteClass.id = req.body.id

              Unite.updateUniteInModel(initUniteClass)
                .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_update" }));
            }
            else {
              res.status(500).json({ error: "Ce symbole existe déjà" })
            }
          })
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_selectBy" }))
      }
      else {
        res.status(500).json({ error: "Cette unite existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée unites_selectBy" }))
}


//supression logique d'un axe
function deleteUnite(req, res, next) {
  Unite.deleteUniteInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }))
}


module.exports = {

  uniteSelectBy,
  selectAllUnite,
  selectByIdUnite,
  addUnite,
  updateUnite,
  deleteUnite

}