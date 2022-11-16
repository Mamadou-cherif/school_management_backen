const UserService = require("../models/userservice")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")

function addUserService(req, res, next) {
    
  const userservice = {

    userId: req.body.userId,
    serviceId: req.body.serviceId,
    debut: req.body.debut,
    fin: req.body.fin,
    creationUserId: req.body.creationUserId,

  }
  UserService.addUserServiceInModel(userservice)
    .then(() => res.status(201).json({ succes: "la création a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}


//supression logique d'un userservice
function disableUserService(req, res, next) {
    const userserviceObj={
        id : req.body.id,
        modifUserId : req.body.modifUserId,
        modifDate : req.body.modifDate
    }
  

  UserService.disableUserServiceInModel(userserviceObj)
    .then(() => res.status(201).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function userserviceSelectBy(req, res, next) {
  const userservice = {
    id: req.body.id || null,
    userId: req.body.userId || null,
    serviceId: req.body.serviceId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debutDonnees: req.body.debutDonnees || null,
    finDonnees: req.body.finDonnees || null
  }

  UserService.UserServiceSelectByInModel(userservice)
    .then(userservice => res.status(200).json(userservice))
    .catch(error => res.status(400).json({ error }))

}


function updateUserService(req, res, next) {

  const userservice = {
    id: req.body.id,
    userId: req.body.userId,
    serviceId: req.body.serviceId,
    debut: req.body.debut,
    fin: req.body.fin,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId

  }
  UserService.updateUserServiceInModel(userservice)
    .then(() => res.status(200).json({ succes: "la modification a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké de modification" }));

}



function selectNotAffecteUserServiceId(req, res, next) {
  const userserviceObj= {
    userId: req.body.userId,
    estActif: 1
  }
  UserService.selectNotAffecteUserServiceIdInModel(userserviceObj)
    .then(userservice => res.status(200).json(userservice))
    .catch(error => res.status(400).json(error))
}


function getAsingleUserService(req, res, next) {
  const id = req.params.id
  UserService.getUserServiceByIdInModel(id)
    .then(userservice => res.status(200).json(userservice))
    .catch(error => res.status(400).json(error))
}


function getAllUserServices(req, res, next) {

  UserService.getAllUserServiceInModel()
    .then(userservices => res.status(200).json(userservices))
    .catch(error => res.status(400).json(error))
}



module.exports = {
  disableUserService,
  selectNotAffecteUserServiceId,
  addUserService,
  updateUserService,
  getAsingleUserService,
  getAllUserServices,
  userserviceSelectBy
}