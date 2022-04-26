const Privilege= require("../models/privilges")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initPrivilegeClass= require("../classes/privileges")


function addPrivilege(req, res,next){
                      Privilege.addPrivilegeInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));           
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

function deletePrivilege(req, res,next){


    initPrivilegeClass.privilege.menuId= req.body.menuId
    initPrivilegeClass.privilege.groupeId= req.body.groupeId
    initPrivilegeClass.privilege.modeAccesId= req.body.modeAccesId
    console.log(req.body)
    Privilege.checkIfPrivilegeExists(initPrivilegeClass.privilege)
        .then(privilege=>{
            
                    Privilege.deletePrivilegeInModel(privilege[0].id)
                        .then(()=>res.status(200).json({succes: "suppression succes"}))
                        .catch(error=>res.status(400).json({error}))
        })
}


function checkIfPrivilegeExists(req, res, next){
    const obj={
        menuId: req.body.menuId,
        groupeId: req.body.groupeId,
        modeAccesId: req.body.modeAccesId,
    }
    Privilege.checkIfPrivilegeExists(obj)
        .then(privilege=> res.status(201).json(privilege))
        .catch(()=> res.status(400).json({error: "erreur de la procédure stockée de suppression"}));           

}
 
module.exports={
    disablePrivilege,
    addPrivilege,
    getAllPrivileges,
    deletePrivilege,
    checkIfPrivilegeExists
    
   
}