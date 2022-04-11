const Privilege= require("../models/privilges")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initPrivilegeClass= require("../classes/privileges")


function addPrivilege(req, res,next){

  initPrivilegeClass.privilege.id= req.body.id
        initPrivilegeClass.privilege.libelle= req.body.libelle
       // initPrivilegeClass.Privilege.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     Privilege.checkIfPrivilegeExists(initPrivilegeClass.privilege)
          .then(privilege=> {
                if(privilege.length==0){
                      Privilege.addPrivilegeInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Le Privilege existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}


function getAllPrivileges(req,res, next){

  Privilege.getAllPrivilegesInModel(req)
     .then(privileges=> res.status(200).json(privileges))
     .catch(error=> res.status(400).json(error))
}

//supression logique d'un utilisateur
function disablePrivilege(req, res, next){
    Privilege.disablePrivilegeInModel(req,res)
}


 
module.exports={
    disablePrivilege,
    addPrivilege,
    getAllPrivileges
    
   
}