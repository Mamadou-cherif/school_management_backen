const Pays = require("../models/pays")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
const initPaysClass = require("../classes/pays")

function getAllPays(req, res, next) {

  Pays.getAllPaysInModel(req)
    .then(pays => res.status(200).json(pays))
    .catch(error => res.status(400).json(error))
}

function getPaysById(req, res, next) {
  const id = req.params.id
  Pays.getPaysByIdInModel(id)
    .then(pays => res.status(200).json(pays))
    .catch(error => res.status(400).json(error))
}


function addPays(req, res, next) {

  const objPAys = {
    libelle: req.body.libelle,
    estActif: 1
  }


  //verifie si l'utilisateur existe en base
  Pays.paysSelectByInModel(objPAys)
    .then(pays => {
      if (pays.length == 0) {
        initPaysClass.libelle = req.body.libelle
        initPaysClass.indicatifTel = req.body.indicatifTel
        initPaysClass.deviseId = req.body.deviseId
        initPaysClass.creationUserId = req.body.creationUserId
        Pays.addPaysInModel(initPaysClass)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée payss_insert" }));
      }
      else {
        res.status(500).json({ error: "Ce pays existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée payss_selectBy" }))
}


function updatePays(req, res, next) {

  const objPays = {
    libelle: req.body.libelle,
    estActif: 1
  }


  //verifie si l'utilisateur existe en base
  Pays.paysSelectByInModel(objPays)
    .then(pays => {
      if ((pays.length == 0) || (pays[0].id == req.body.id)) {
        initPaysClass.libelle = req.body.libelle
        initPaysClass.indicatifTel = req.body.indicatifTel
        initPaysClass.deviseId = req.body.deviseId
        initPaysClass.modifUserId = req.body.modifUserId
        initPaysClass.modifDate = req.body.modifDate
        initPaysClass.id = req.body.id
        Pays.updatePaysInModel(initPaysClass)
          .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée payss_update" }));
      }
      else {
        res.status(500).json({ error: "Ce pays existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée payss_selectBy" }))
}


//supression logique d'un axe
function deletePays(req, res, next) {
  Pays.deletePaysInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible car ce pays appartient dans une autre table" }));
}


module.exports = {
  getAllPays,
  getPaysById,
  addPays,
  deletePays,
  updatePays
}