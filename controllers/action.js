const Action = require("../models/actions")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const initActionClass = require("../classes/actions")


function addAction(req, res,next){
    const objAction={
        projetId: req.body.projetId,
        libelle: req.body.libelle,
        estActif:1
    }
     Action.actionsSelectByInModel(objAction)
          .then(action=> {
                if(action.length==0){
                    
                    const actionsObj={
                        projetId: req.body.projetId,
                        categorieActionId: req.body.categorieActionId,
                        libelle: req.body.libelle,
                        typeExpertiseId: req.body.typeExpertiseId,
                        charge: req.body.charge,
                        uniteId: req.body.uniteId,
                        delai: req.body.delai,
                        unite2Id: req.body.unite2Id,
                        cout: req.body.cout,
                        deviseId: req.body.deviseId,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }

                      Action.addActionInModel(actionsObj)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet action existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}



function actionsSelectBy(req, res, next){
    const actionsObj={
        id: req.body.id || null,
        projetId: req.body.projetId || null,
        categorieActionId: req.body.categorieActionId || null,
        libelle: req.body.libelle || null,
        typeExpertiseId: req.body.typeExpertiseId || null,
        charge: req.body.charge || null,
        uniteId: req.body.uniteId || null,
        delai: req.body.delai || null,
        unite2Id: req.body.unite2Id || null,
        cout: req.body.cout || null,
        deviseId: req.body.deviseId || null,
        observations: req.body.observations|| null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    Action.actionsSelectByInModel(actionsObj)
        .then(action=> res.status(200).json(action))
        .catch(error=> res.status(400).json(error))

}







 
function updateAction(req,res, next){
        
    const objAction={
        projetId: req.body.projetId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Action.actionsSelectByInModel(objAction)
          .then(action=> {
                if((action.length==0) || (action[0].id == req.body.id)){
                    
                    const actionsObj={
                        id: req.body.id,
                        projetId: req.body.projetId,
                        categorieActionId: req.body.categorieActionId,
                        libelle: req.body.libelle,
                        typeExpertiseId: req.body.typeExpertiseId,
                        charge: req.body.charge,
                        uniteId: req.body.uniteId,
                        delai: req.body.delai,
                        unite2Id: req.body.unite2Id,
                        cout: req.body.cout,
                        deviseId: req.body.deviseId,
                        observations: req.body.observation,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Action.updateActionInModel(actionsObj)
                          .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet action existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un action
function disableAction(req, res, next) {
    initActionClass.id = req.body.id
    initActionClass.modifUserId = req.body.modifUserId
    initActionClass.modifDate = req.body.modifDate
    console.log(req.body)
    Action.disableActionInModel(initActionClass)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

// function updateAction(req, res, next) {


//     initActionClass.libelle = req.body.libelle

//     //verifie si l'utilisateur existe en base
//     Action.actionsSelectByInModel(initActionClass)
//         .then(action => {
//             if (action.length == 0) {
//                 initActionClass.id = req.body.id
//                 initActionClass.projetId = req.body.projetId
//                 initActionClass.categorieActionId = req.body.categorieActionId
//                 initActionClass.libelle = req.body.libelle
//                 initActionClass.typeExpertiseId = req.body.typeExpertiseId
//                 initActionClass.charge = req.body.charge
//                 initActionClass.uniteId = req.body.uniteId
//                 initActionClass.delai = req.body.delai
//                 initActionClass.unite2Id = req.body.unite2Id
//                 initActionClass.cout = req.body.cout
//                 initActionClass.deviseId = req.body.deviseId
//                 initActionClass.observations = req.body.observations
//                 initActionClass.modifDate = req.body.modifDate
//                 initActionClass.modifUserId = req.body.modifUserId

//                 Action.updateActionInModel(initActionClass)
//                     .then(() => res.status(200).json({ succes: "la modification a reussi" }))
//                     .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
//             }
//             else {
//                 res.status(500).json({ error: "cet action existe déjà" })
//             }
//         })
//         .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))

// }

function getAsingleAction(req, res, next) {
    const id = req.params.id
    Action.getActionByIdInModel(id)
        .then(action => res.status(200).json(action))
        .catch(error => res.status(400).json(error))
}


function getAllActions(req, res, next) {
    initActionClass.estActif = req.body.estActif
    initActionClass.debut = req.body.debut
    initActionClass.fin = req.body.fin

    Action.getAllActionInModel(initActionClass)
        .then(actions => res.status(200).json(actions))
        .catch(error => res.status(400).json(error))
}

module.exports = {
    disableAction,
    addAction,
    updateAction,
    getAsingleAction,
    getAllActions,
    actionsSelectBy
}