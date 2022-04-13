const UserGroupe= require("../models/userGroupes")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initUserGroupeClass= require("../classes/userGroupes")


function addUserGroupe(req, res,next){
      
         
        
        initUserGroupeClass.userGroupe.userId= req.body.userId
        initUserGroupeClass.userGroupe.groupeId= req.body.groupeId
     //verifie si l'utilisateur existe en base
     UserGroupe.checkIfUserGroupeExists(initUserGroupeClass.userGroupe)
          .then(userGroupe=> {
                if(userGroupe.length==0){
                      UserGroupe.addUserGroupeInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Le userGroupe existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}





//supression en dur
function deleteUserGroupe(req, res, next){
    
   UserGroupe.deleteUserGroupeInModel(req,res)
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
    disableUserGroupe,
    deleteUserGroupe,
    addUserGroupe,
    updateUserGroupe,
    getAsingleUserGroupe,
    getAllUserGroupes,
    activateUserGroupe,
}