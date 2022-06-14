const Service = require("../models/service")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initServiceClass = require("../classes/service")


function addService(req, res, next) {

  const service = {

    structureId: req.body.structureId,
    nom: req.body.nom,
    responsableService: req.body.responsableService,
    email: req.body.email,
    telephone: req.body.telephone,
    observations: req.body.observations,
    creationUserId: req.body.creationUserId,

  }

  Service.addServiceInModel(service)
    .then(() => res.status(201).json({ succes: "la création a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



//supression logique d'un service
function disableService(req, res, next) {
  initServiceClass.id = req.body.id
  initServiceClass.modifUserId = req.body.modifUserId
  initServiceClass.modifDate = req.body.modifDate

  Service.disableServiceInModel(initServiceClass)
    .then(() => res.status(201).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function serviceSelectBy(req, res, next) {


  const intervention = {
    id: req.body.id,
    structureId: req.body.structureId,
    nom: req.body.nom,
    responsableService: req.body.responsableService,
    email: req.body.email,
    telephone: req.body.telephone,
    estActif: 1,
    creationDate: req.body.creationDate,
    creationUserId: req.body.creationUserId,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }

  Service.ServiceSelectByInModel(intervention)
    .then(intervention => res.status(200).json(intervention))
    .catch(error => res.status(400).json({ error }))

}


function updateService(req, res, next) {

  const service = {
    id: req.body.id,
    structureId: req.body.structureId,
    nom: req.body.nom,
    responsableService: req.body.responsableService,
    email: req.body.email,
    telephone: req.body.telephone,
    observations: req.body.observations,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId

  }
  Service.updateServiceInModel(service)
    .then(() => res.status(200).json({ succes: "la modification a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké de modification" }));

}

function getAsingleService(req, res, next) {
  const id = req.params.id
  Service.getServiceByIdInModel(id)
    .then(service => res.status(200).json(service))
    .catch(error => res.status(400).json(error))
}


function getAllServices(req, res, next) {

  Service.getAllServiceInModel()
    .then(services => res.status(200).json(services))
    .catch(error => res.status(400).json(error))
}



module.exports = {
  disableService,
  addService,
  updateService,
  getAsingleService,
  getAllServices,
  serviceSelectBy
}