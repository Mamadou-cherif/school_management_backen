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
    id: req.body.id || null,
    structureId: req.body.structureId || null,
    nom: req.body.nom || null,
    responsableService: req.body.responsableService || null,
    email: req.body.email || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }

  console.log(service);
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
    id: req.body.id || null,
    structureId: req.body.structureId || null,
    nom: req.body.nom || null,
    responsableService: req.body.responsableService || null,
    email: req.body.email || null,
    telephone: req.body.telephone || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }

  Service.ServiceSelectByInModel(intervention)
    .then(intervention => res.status(200).json(intervention))
    .catch(error => res.status(400).json({ error }))

}


function updateService(req, res, next) {

  const service = {
    id: req.body.id || null,
    structureId: req.body.structureId || null,
    nom: req.body.nom || null,
    responsableService: req.body.responsableService || null,
    email: req.body.email || null,
    observations: req.body.observations || null,
    estActif: 1,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null

  }
  Service.updateServiceInModel(service)
    .then(() => res.status(200).json({ succes: "la modification a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké de modification" }));
  //   .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))

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