const ModeAcces= require("../models/modeacces")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initModeAccesClass= require("../classes/modeaccess")


function addModeAcces(req, res,next){             
        
        initModeAccesClass.modeaccess.id= req.body.id
        initModeAccesClass.modeaccess.libelle= req.body.libelle
       // initModeAccesClass.ModeAcces.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     ModeAcces.checkIfModeAccesExists(initModeAccesClass.modeaccess)
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

function getAffectesByMenuAndGroupe(req, res, next){
 ModeAcces.getAffectesByMenuAndGroupeInModel()
      .then(modeaccess=>res.status(200).json(modeaccess))
      .catch(error=> res.status(400).json(error))
}

////////////////////////

function getNonAffectedByMenuAndGroupe(req, res, next){
   const pereOuFils= req.body.pereOuFils;
   const listeModeAcces= []
   if(pereOuFils==1){
          ModeAcces.getNonAffectedByMenuAndGroupeInModel(req)
          .then(data=> {
              for(let i; i< data.length; i++){
                if(data[i].libelle=='Consultation'){
                 
                  ModeAcces.getModeAccessByIdInModel(data[i].id)
                    .then(data2=> {
                             listeModeAcces=data2
                    })
                    .catch(error=> res.status(400).json({error}))
                  
                }
                else{
                  res.status(200).json({listeModeAcces})
                }
              }
          })
   }
   else{
    ModeAcces.getNonAffectedByMenuAndGroupeInModel(req)
    .then(data=> {
        listeModeAcces= data
    })
   }
  
}

function getPrincipalAffecteAUnGroupe(req, res, next){
  ModeAcces.getPrincipalAffecteAUnGroupeInModel(req)
    .then(modeaccess=>res.status(200).json(modeaccess))
    .catch(error=> res.status(400).json(error))
}

function getModeAccessById(req, res, next){
  ModeAcces.getModeAccessByIdInModel(req)
    .then(modeaccess=> res.status(200).json({modeaccess}))
    .catch(error=> res.status(400).json({error}))
}

//supression logique d'un utilisateur
function disableModeAcces(req, res, next){
    ModeAcces.disableModeAccesInModel(req,res)
}

function getPrincipalAffecteAUnGroupe(req, res, next){
  ModeAcces.getPrincipalAffecteAUnGroupeInModel()
  .then(modeaccess=> res.status(200).json({modeaccess}))
  .catch(error=> res.status(400).json({error}))
}
 
////////////////////////////////////////////////////////////////////////////////////////////



 
module.exports={
    getAffectesByMenuAndGroupe,
    getModeAccessById,
    disableModeAcces,
    getNonAffectedByMenuAndGroupe,
    addModeAcces,
    getPrincipalAffecteAUnGroupe,
   
}