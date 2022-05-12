const UserGroupe= require("../models/userGroupes")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initUserGroupeClass= require("../classes/userGroupes")


function addUserGroupe(req, res,next){
      
                      UserGroupe.addUserGroupeInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}





//supression en dur
function deleteUserGroupe(req, res, next){
    
   UserGroupe.deleteUserGroupeInModel(req,res)

}

function checkIfUserGroupeExists(req,res, next){
     initUserGroupeClass.userGroupe.groupeId= req.body.groupeId

    UserGroupe.checkIfUserGroupeExists(initUserGroupeClass.userGroupe)
       .then(userGroupes=> res.status(200).json(userGroupes))
       .catch(error=> res.status(400).json(error))
}

function deleteUserGroupe(req, res,next){

    const usergroupe={
        userId: req.body.userId,
        groupeId: req.body.groupeId
    }
    
    UserGroupe.checkIfUserGroupeExists(usergroupe)
        .then(usergroupe=>{
            
            if(usergroupe.length>0){
                
                UserGroupe.deleteUserGroupeInModel(usergroupe[0].id)
                        .then(()=>res.status(200).json({succes: "suppression succes"}))
                        .catch(error=>res.status(400).json({error}))
            }
            else{
                return res.status(400).json({error: "cet utilisateur n'existe pas dans ce groupe Choisi"})
            }
           
        })
}

//supression logique d'un utilisateur
function disableUserGroupe(req, res, next){
    UserGroupe.disableUserGroupeInModel(req,res)
}
 
function updateUserGroupe(req,res, next){
        
       
    //     initUserGroupeClass.userGroupe.userId= req.body.userId
    //     initUserGroupeClass.userGroupe.groupeId= req.body.groupeId
        
    //  UserGroupe.checkIfUserGroupeExists(initUserGroupeClass.userGroupe)
    //      .then(data=>{
    //          console.log(data)
    //               if(data.length==0){
                   UserGroupe.updateUserGroupeInModel(req, res)
                     
            //       }
            //       else{
            //           res.status(400).json({error: "ce userGroupe existe deja dans notre systeme"});
            //       }
            //  })
            //  .catch(error=>res.status(400).json(error))


}

function getAsingleUserGroupe(req, res, next){
    UserGroupe.getAsingleUserGroupeInModel(req)
        .then(userGroupes=> res.status(200).json(userGroupes))
        .catch(error=> res.status(400).json(error))
}


function getAllUserGroupes(req,res, next){

     UserGroupe.getAllUserGroupesInModel(req)
        .then(userGroupes=> res.status(200).json(userGroupes))
        .catch(error=> res.status(400).json(error))
}


 function activateUserGroupe(req, res, next){
    UserGroupe.activateUserGroupe(req, res)
    
}


 
module.exports={
    checkIfUserGroupeExists,
    disableUserGroupe,
    deleteUserGroupe,
    addUserGroupe,
    updateUserGroupe,
    getAsingleUserGroupe,
    getAllUserGroupes,
    activateUserGroupe,
}