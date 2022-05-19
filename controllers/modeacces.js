const ModeAcces = require("../models/modeacces")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initModeAccesClass = require("../classes/modeaccess")


function addModeAcces(req, res,next){             
        
  const objModeAcces={
    libelle:req.body.libelle,
    estActif:1
}
     ModeAcces.checkIfModeAccesExists(objModeAcces)
          .then(modeaccess=> {
                if(modeaccess.length==0){
                      ModeAcces.addModeAccesInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Ce ModeAcces existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}

function getAllModeAccess(req, res, next) {
  ModeAcces.getAllModeAccessInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json(error))
}

function getAffectesByMenuAndGroupe(req, res, next) {
  ModeAcces.getAffectesByMenuAndGroupeInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json(error))
}

function getFilsAffecteAUnGroupe(req, res, next) {
  ModeAcces.getFilsAffecteAUnGroupeInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json(error))
}

/////////////////////////////////////////////////////

function getNonAffectedByMenuAndGroupe(req, res, next) {
  const pereOuFils = req.body.pereOuFils;
  listeModeAcces = []

  if (pereOuFils == 1) {
    ModeAcces.getNonAffectedByMenuAndGroupeInModel(req)
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].libelle == 'Consultation') {
            // return res.status(200).json(data[i])
            ModeAcces.getModeAccessByIdInModel(data[i].id)
              .then(data2 => {

                return res.status(200).json(data2)
              })
              .catch(error => res.status(400).json({ error }))
          }
          // else{
          //   return res.status(200).json(listeModeAcces)
          // }

        }

      })

  }
  else {
    ModeAcces.getNonAffectedByMenuAndGroupeInModel(req)
      .then(data => {
        listeModeAcces = data
        return res.status(200).json(listeModeAcces)
      })
  }

}

function getPrincipalAffecteAUnGroupe(req, res, next) {
  ModeAcces.getPrincipalAffecteAUnGroupeInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json(error))
}

function getModeAccessById(req, res, next){
   ModeAcces.getModeAccessByIdInModel(req.params.id)
     .then(modeaccess=> res.status(200).json({modeaccess}))
     .catch(error=> res.status(400).json({error}))
}

//supression logique d'un utilisateur
function disableModeAcces(req, res, next) {
  ModeAcces.disableModeAccesInModel(req, res)
}

function getPrincipalAffecteAUnGroupe(req, res, next) {
  ModeAcces.getPrincipalAffecteAUnGroupeInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json({ error }))
}




function getNotAffectedByOngletAndGroupe(req, res, next) {
  ModeAcces.getNotAffectedByOngletAndGroupeInModel(req)
    .then(modeaccess => res.status(200).json(modeaccess))
    .catch(error => res.status(400).json({ error }))
}

function getAffectedByOngletAndGroupe(req, res, next) {
  ModeAcces.getAffectedByOngletAndGroupeInModel(req)
  .then(modeaccess=> res.status(200).json(modeaccess))
  .catch(error=> res.status(400).json({error}))
}
 


function selectModeAccesById(req, res, next){
    ModeAcces.getModeAccesById(req)
      .then(modeaccess=> res.status(200).json({modeaccess}))
      .catch(()=> res.status(400).json({}))
}
 

function updateModeAcces(req, res, next){
  
 
        const objModeAcces={
          libelle:req.body.libelle,
          estActif:1
        }
        ModeAcces.checkIfModeAccesExists(objModeAcces)
            .then(modeaccess=> {
                  if((modeaccess.length==0) || (modeaccess[0].id== req.body.id)){
                    initModeAccesClass.modeaccess.id= req.body.id
                    initModeAccesClass.modeaccess.libelle= req.body.libelle
                    initModeAccesClass.modeaccess.modifDate= req.body.modifDate
                    initModeAccesClass.modeaccess.modifUserId= req.body.modifUserId
                      ModeAcces.updateModeAccesInModel(initModeAccesClass.modeaccess)
                          .then(()=> res.status(201).json({succes: "la modification a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stockée de modification"}));
                  
                  }
                  else
                      {
                        res.status(500).json({error: "Ce ModeAcces existe déjà"})
                      }
            })
            .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
        
      
 
}



function selectModeAccesById(req, res, next) {
  ModeAcces.getModeAccessById(req)
    .then(modeaccess => res.status(200).json({ modeaccess }))
    .catch(() => res.status(400).json({}))
}


function updateModeAcces(req, res, next) {

  initModeAccesClass.modeaccess.id = req.body.id
  initModeAccesClass.modeaccess.libelle = req.body.libelle
  initModeAccesClass.modeaccess.modifDate = req.body.modifDate
  initModeAccesClass.modeaccess.modifUserId = req.body.modifUserId
  ModeAcces.updateModeAccesInModel(initModeAccesClass.modeaccess)
    .then(() => res.status(201).json({ succes: "la modification a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stockée de modification" }));

}

module.exports = {
  selectModeAccesById,
  updateModeAcces,
  getAffectedByOngletAndGroupe,
  getAffectesByMenuAndGroupe,
  getModeAccessById,
  disableModeAcces,
  getNonAffectedByMenuAndGroupe,
  addModeAcces,
  getPrincipalAffecteAUnGroupe,
  getNotAffectedByOngletAndGroupe,
  getAllModeAccess,
  getFilsAffecteAUnGroupe


}