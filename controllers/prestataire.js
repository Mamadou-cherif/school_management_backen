
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Prestataire = require("../models/prestataire")
app.use(bodyParser.json())
const initPrestaClass = require("../classes/prestataire")


//const initPrefecturesClass= require("../classes/prefectures")
function addPrestataire(req, res, next) {

  const prestataireObj = {
    nom: req.body.nom,
    estActif: 1
  }


  Prestataire.prestataireSelectByInModel(prestataireObj)
    .then(presta => {

      if ((presta.length == 0)) {
        const prestataireObj = {
          sigle: req.body.sigle,
          estActif: 1
        }
        Prestataire.prestataireSelectByInModel(prestataireObj)
          .then(presta => {
            if ((presta.length == 0)) {
              const prestataireObj = {
                telephone: req.body.telephone,
                estActif: 1
              }

              Prestataire.prestataireSelectByInModel(prestataireObj)
                .then(presta => {
                  if (((presta.length == 0))) {

                    const prestataireObj = {

                      type: req.body.type,
                      categorie: req.body.categorie,
                      localisation: req.body.localisation,
                      nom: req.body.nom,
                      sigle: req.body.sigle,
                      telephone: req.body.telephone,
                      email: req.body.email,
                      adresse: req.body.adresse,
                      localiteId: req.body.localiteId,
                      partenaireLocalId: req.body.partenaireLocalId,
                      observations: req.body.observations,
                      creationUserId: req.body.creationUserId
                    }
                    Prestataire.addPrestataireInModel(prestataireObj)
                      .then(() => res.status(200).json({ succes: "la création a reussi" }))
                      .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké d'ajout" }));

                  }
                  else {
                    return res.status(400).json({ error: "Le télephone doit être unique " })
                  }
                })
                .catch()

            }
            else {
              return res.status(400).json({ error: "Duplicata du sigle du prestataire" })
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










function updatePrestataire(req, res, next) {

  const prestataireObj = {
    nom: req.body.nom,
    estActif: 1
  }


  Prestataire.prestataireSelectByInModel(prestataireObj)
    .then(presta => {
      (presta);
      if ((presta.length == 0) || (presta[0].id == req.body.id)) {
        const prestataireObj = {
          sigle: req.body.sigle,
          estActif: 1
        }
        Prestataire.prestataireSelectByInModel(prestataireObj)
          .then(presta => {
            if (((presta.length == 0) || (presta[0].id == req.body.id))) {
              const prestataireObj = {
                telephone: req.body.telephone,
                estActif: 1
              }

              Prestataire.prestataireSelectByInModel(prestataireObj)
                .then(presta => {
                  if (((presta.length == 0) || (presta[0].id == req.body.id))) {

                    const prestataireObj = {
                      id: req.body.id,
                      type: req.body.type,
                      categorie: req.body.categorie,
                      localisation: req.body.localisation,
                      nom: req.body.nom,
                      sigle: req.body.sigle,
                      telephone: req.body.telephone,
                      email: req.body.email,
                      adresse: req.body.adresse,
                      localiteId: req.body.localiteId,
                      partenaireLocalId: req.body.partenaireLocalId,
                      observations: req.body.observations,
                      modifDate: req.body.modifDate,
                      modifUserId: req.body.modifUserId

                    }
                      ("obje", prestataireObj);
                    Prestataire.updatePrestataireInModel(prestataireObj)
                      .then(() => res.status(201).json({ succes: "la modification a reussi" }))
                      .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de modification" }));

                  }
                  else {
                    return res.status(400).json({ error: "Le télephone doit être unique " })
                  }
                })
                .catch()

            }
            else {
              return res.status(400).json({ error: "Duplicata du sigle du prestataire" })
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




function disablePrestataire(req, res, next) {

  const obj = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }
    ("dis", obj);

  Prestataire.disablePrestataireInModel(obj)
    .then(() => res.status(201).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de suppression" }));
}


function prestataireSelectBy(req, res, next) {
  Prestataire.prestataireSelectByInModel(req)
    .then(prestataire => res.status(200).json(prestataire))
    .catch(error => res.status(400).json(error))
}

function getAllPrestataire(req, res, next) {

  Prestataire.getAllPrestataireInModel(req)
    .then(prestaire => res.status(200).json(prestaire))
    .catch(error => res.status(400).json(error))
}




function addPrestataire(req, res, next) {
}





//supression en dur
function deletePrestataire(req, res, next) {

}

//supression logique d'un utilisateur
function disablePrestataire(req, res, next) {
}



function updatePrestataire(req, res, next) {


}

function getAsinglePrestataire(req, res, next) {

}




module.exports = {
  disablePrestataire,
  deletePrestataire,
  addPrestataire,
  updatePrestataire,
  getAsinglePrestataire,
  prestataireSelectBy,
  getAllPrestataire
}

