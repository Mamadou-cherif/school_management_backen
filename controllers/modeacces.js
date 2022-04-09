const ModeAcces= require("../models/ModeAccess")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initModeAccesClass= require("../classes/modeaccess")


function addModeAcces(req, res,next){             
        
        initModeAccesClass.ModeAcces.id= req.body.id
        initModeAccesClass.ModeAcces.libelle= req.body.libelle
       // initModeAccesClass.ModeAcces.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     ModeAcces.checkIfModeAccesExists(initModeAccesClass.ModeAcces)
          .then(ModeAcces=> {
                if(ModeAcces.length==0){
                      ModeAcces.addModeAccesInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Le ModeAcces existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}





//supression logique d'un utilisateur
function disableModeAcces(req, res, next){
    ModeAcces.disableModeAccesInModel(req,res)
}


 
module.exports={
    disableModeAcces,
    addModeAcces,
   
}