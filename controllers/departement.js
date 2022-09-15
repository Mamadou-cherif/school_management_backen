const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Departement = require("../models/departement")
app.use(bodyParser.json())

function addDepartement(req, res, next) {
  const departementObj = {
    nom: req.body.nom,
    estActif: 1
  }

  Departement.departementSelectByInModel(departementObj)
    .then(departement => {

      if ((departement.length == 0)) {
        const departementObj = {
          telephone1: req.body.telephone1,
          estActif: 1
        }

        Departement.departementSelectByInModel(departementObj)
          .then(stru => {
            if ((stru.length == 0)) {
              const departement = {
                nom: req.body.nom,
                sigle: req.body.sigle,
                logo: req.body.logo,
                website: req.body.website,
                telephone1: req.body.telephone1,
                telephone2: req.body.telephone2,
                email: req.body.email,
                adresse: req.body.adresse,
                localiteId: req.body.localiteId,
                header: req.body.header,
                footer: req.body.footer,
                observations: req.body.observations,
                creationUserId: req.body.creationUserId
              }
              Departement.addDepartementInModel(departement)
                .then(() => res.status(200).json({ succes: "la création a reussi" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké d'ajout" }));
            }
            else {
              return res.status(400).json({ error: "Le télephone1 doit être unique " })
            }
          })
          .catch()

      }
      else {
        res.status(500).json({ error: "Ce nom existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur retournée par la procédure stockée de selectBy" }))

}




function updateDepartement(req, res, next) {
  const DepartementObj = {
    nom: req.body.nom,
    estActif: 1
  }

  Departement.departementSelectByInModel(DepartementObj)
    .then(departement => {

      if ((departement.length == 0) || (departement[0].id == req.body.id)) {
        const DepartementObj = {
          telephone1: req.body.telephone1,
          estActif: 1
        }
        Departement.departementSelectByInModel(DepartementObj)
          .then(departement => {
            if (((departement.length == 0) || (departement[0].id == req.body.id))) {
              const departement = {
                id: req.body.id,
                nom: req.body.nom,
                sigle: req.body.sigle,
                logo: req.body.logo,
                website: req.body.website,
                telephone1: req.body.telephone1,
                telephone2: req.body.telephone2,
                email: req.body.email,
                adresse: req.body.adresse,
                localiteId: req.body.localiteId,
                header: req.body.header,
                footer: req.body.footer,
                observations: req.body.observations,
                modifDate: req.body.modifDate,
                modifUserId: req.body.modifUserId
              }
              Departement.updateDepartementInModel(departement)
                .then(() => res.status(201).json({ succes: "la modification a reussi" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de modification" }));

            }
            else {
              return res.status(400).json({ error: "Le télephone1 doit être unique " })
            }
          })
          .catch()
      }
      else {
        res.status(500).json({ error: "Ce nom existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur retournée par la procédure stockée de selectBy" }))

}

function getAllDepartement(req, res, next) {

  Departement.getAllDepartementInModel()
    .then(departement => res.status(200).json(departement))
    .catch(error => res.status(400).json(error))
}


function getAllDepartement(req, res, next) {

  Departement.getAllDepartementInModel(req)
    .then(departement => res.status(200).json(departement))
    .catch(error => res.status(400).json(error))
}
function disableDepartement(req, res, next) {

  const obj = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Departement.disableDepartementInModel(obj)
    .then(() => res.status(201).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de suppression" }));
}


function getAsingleDepartement(req, res, next) {
  const id = req.params.id
  Departement.getDepartementByIdInModel(id)
    .then(departement => res.status(200).json(departement))
    .catch(error => res.status(400).json(console.log(error)))
}

function countAllDepartement(req,res, next){
  Departement.countAllDepartementInModel()
      .then(nombre=> res.status(200).json(nombre))
      .catch(error=> res.status(400).json(error))
}
module.exports = {
  getAllDepartement,
  countAllDepartement,
  addDepartement,
  disableDepartement,
  updateDepartement,
  getAsingleDepartement,
  getAllDepartement
}