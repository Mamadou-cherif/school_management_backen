const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Structure = require("../models/structure")
app.use(bodyParser.json())



function addStructure(req, res, next) {

  const structureObj = {
    nom: req.body.nom,
    estActif: 1
  }


  Structure.structureSelectByInModel(structureObj)
    .then(structure => {

      if ((structure.length == 0)) {
        const structureObj = {
          sigle: req.body.sigle,
          estActif: 1
        }
        Structure.structureSelectByInModel(structureObj)
          .then(structure => {


            if ((structure.length == 0)) {
              const structureObj = {
                telephone1: req.body.telephone1,
                estActif: 1
              }

              Structure.structureSelectByInModel(structureObj)
                .then(stru => {
                  if ((stru.length == 0)) {
                    const structure = {

                      categorieId: req.body.categorieId,
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

                    Structure.addStructureInModel(structure)
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
              return res.status(400).json({ error: "Duplicata du sigle de la structure" })
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




function updateStructure(req, res, next) {


  const StructureObj = {
    nom: req.body.nom,
    estActif: 1
  }

  Structure.structureSelectByInModel(StructureObj)
    .then(structure => {

      if ((structure.length == 0) || (structure[0].id == req.body.id)) {
        const prestataireObj = {
          sigle: req.body.sigle,
          estActif: 1
        }
        Structure.structureSelectByInModel(prestataireObj)
          .then(structure => {
            if (((structure.length == 0) || (structure[0].id == req.body.id))) {
              const StructureObj = {
                telephone1: req.body.telephone1,
                estActif: 1
              }

              Structure.structureSelectByInModel(StructureObj)
                .then(structure => {
                  if (((structure.length == 0) || (structure[0].id == req.body.id))) {
                    const structure = {
                      id: req.body.id,
                      categorieId: req.body.categorieId,
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
                    Structure.updateStructureInModel(structure)
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
              return res.status(400).json({ error: "Duplicata du sigle de la structure" })
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

function getAllStructure(req, res, next) {

  Structure.getAllStructureInModel(req)
    .then(structure => res.status(200).json(structure))
    .catch(error => res.status(400).json(error))
}


function getAllCategorieStructure(req, res, next) {

  Structure.getAllCategorieStructureInModel(req)
    .then(structure => res.status(200).json(structure))
    .catch(error => res.status(400).json(error))
}
function disableStructure(req, res, next) {

  const obj = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Structure.disableStructureInModel(obj)
    .then(() => res.status(201).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de suppression" }));
}


function getAsingleStructure(req, res, next) {
  const id = req.params.id
  Structure.getStructureByIdInModel(id)
    .then(structure => res.status(200).json(structure))
    .catch(error => res.status(400).json(console.log(error)))
}
module.exports = {
  getAllStructure,
  addStructure,
  disableStructure,
  updateStructure,
  getAsingleStructure,
  getAllCategorieStructure
}