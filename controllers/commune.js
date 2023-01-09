const Commune = require("../models/communes")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initCommunesClass = require("../classes/communes")

function communeSelectBy(req, res, next) {
  const commune={
    id: req.body.id || null,
    prefectureId: req.body.prefectureId || null,
    libelle: req.body.libelle ||   null,
    code: req.body.code ||    null,
    estActif:  1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
      
    debutDonnees: null,
    finDonnees: null
}

  Commune.communeSelectByInModel(commune)
    .then(communes => res.status(200).json(communes))
    .catch(error => res.status(400).json({ error }))
}

function selectAllCommune(req, res, next) {
  Commune.selectAllCommuneInModel(req)
    .then(commnunes => res.status(200).json(commnunes))
    .catch(error => res.status(400).json(error))
}

function selectByIdCommune(req, res, next) {
  const id = req.params.id
  Commune.selectByIdCommuneInModel(id)
    .then(commune => res.status(200).json(commune))
    .catch(error => res.status(400).json(error))
}


function addCommune(req, res, next) {

  const objCommune = {
    libelle: req.body.libelle,
    estActif: 1,
    prefectureId: req.body.prefectureId
  }

  //verifie si l'utilisateur existe en base
  Commune.communeSelectByInModel(objCommune)
    .then(communes => {
      if (communes.length == 0) {
        initCommunesClass.libelle = req.body.libelle
        initCommunesClass.prefectureId = req.body.prefectureId
        initCommunesClass.code = req.body.code
        initCommunesClass.creationUserId = req.body.creationUserId
        Commune.addCommuneInModel(initCommunesClass)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_insert" }));
      }
      else {
        res.status(500).json({ error: "Cette commune existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_selectBy" }))
}


function updateCommune(req, res, next) {

  const objCommune = {
    libelle: req.body.libelle,
    estActif: 1,
    prefectureId: req.body.prefectureId
  }



  //verifie si l'utilisateur existe en base
  Commune.communeSelectByInModel(objCommune)
    .then(communes => {
      if ((communes.length == 0) || (communes[0].id == req.body.id)) {
        initCommunesClass.libelle = req.body.libelle
        initCommunesClass.prefectureId = req.body.prefectureId
        initCommunesClass.code = req.body.code
        initCommunesClass.modifUserId = req.body.modifUserId
        initCommunesClass.modifDate = req.body.modifDate
        initCommunesClass.id = req.body.id
        Commune.updateCommuneInModel(initCommunesClass)
          .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_update" }));
      }
      else {
        res.status(500).json({ error: "Cette commune existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée prefectures_selectBy" }))
}


//supression logique d'un axe
function deleteCommune(req, res, next) {
  Commune.deleteCommuneInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Suppression impossible car cette commune appartient dans une autre table" }));
}


module.exports = {

  communeSelectBy,
  selectAllCommune,
  selectByIdCommune,
  addCommune,
  updateCommune,
  deleteCommune

}