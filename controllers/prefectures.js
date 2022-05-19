const Prefecture = require("../models/prefectures")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initPrefecturesClass = require("../classes/prefecture")

function prefectureSelectBy(req, res, next) {
  initPrefecturesClass.regionId = req.body.regionId
  Prefecture.prefectureSelectByInModel(initPrefecturesClass)
    .then(prefectures => res.status(200).json(prefectures))
    .catch(error => res.status(400).json({ error }))
}



function selectAllPrefecture(req, res, next) {

  Prefecture.selectAllPrefectureInModel(req)
    .then(prefectures => res.status(200).json(prefectures))
    .catch(error => res.status(400).json(error))
}

function selectByIdPrefecture(req, res, next) {
  const id = req.params.id
  Prefecture.selectByIdPrefectureInModel(id)
    .then(prefecture => res.status(200).json(prefecture))
    .catch(error => res.status(400).json(error))
}


function addPrefecture(req, res, next) {
  const objPrefecture = {
    libelle: req.body.libelle,
    estActif: 1,
    regionId: req.body.regionId

  }

  Prefecture.prefectureSelectByInModel(objPrefecture)
    .then(prefectures => {
      if (prefectures.length == 0) {
        initPrefecturesClass.libelle = req.body.libelle
        initPrefecturesClass.regionId = req.body.regionId
        initPrefecturesClass.code = req.body.code
        initPrefecturesClass.creationUserId = req.body.creationUserId
        Prefecture.addPrefectureInModel(initPrefecturesClass)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_insert" }));
      }
      else {
        res.status(500).json({ error: "Cette préfecture existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_selectBy" }))
}


function updatePrefecture(req, res, next) {
  const objPrefecture = {
    libelle: req.body.libelle,
    estActif: 1,
    regionId: req.body.regionId

  }


  Prefecture.prefectureSelectByInModel(objPrefecture)
    .then(prefectures => {
      if ((prefectures.length == 0) || (prefectures[0].id == req.body.id)) {
        initPrefecturesClass.libelle = req.body.libelle
        initPrefecturesClass.regionId = req.body.regionId
        initPrefecturesClass.code = req.body.code
        initPrefecturesClass.modifUserId = req.body.modifUserId
        initPrefecturesClass.modifDate = req.body.modifDate
        initPrefecturesClass.id = req.body.id
        Prefecture.updatePrefectureInModel(initPrefecturesClass)
          .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_update" }));
      }
      else {
        res.status(500).json({ error: "Cette préfecture existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_selectBy" }))
}


//supression logique d'un axe
function deletePrefecture(req, res, next) {
  Prefecture.deletePrefectureInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible car cette préfecture appartient dans une autre table" }));
}


module.exports = {

  prefectureSelectBy,
  selectAllPrefecture,
  selectByIdPrefecture,
  addPrefecture,
  updatePrefecture,
  deletePrefecture

}