const User= require("../models/users")
const express= require("express")
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initUserClass= require("../classes/users")


function addUser(req, res,next){
      
        
        
        initUserClass.user.telephone1= req.body.telephone1
        initUserClass.user.telephone2= req.body.telephone2
        initUserClass.user.email= req.body.email
     //verifie si l'utilisateur existe en base
     User.checkIfUserExists(initUserClass.user)
          .then(user=> {
                if(user.length==0){
                      User.addUserInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké"}));
                }
                else
                   {
                     res.status(500).json({error: "cet utilisateur existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stocké"}))
}



function login(req, res, next){
    const user={
        id:null,
        structureId:null,
        prestataireId:null,
        nom:null,
        prenoms:null,
        fonction:null,
        telephone1: req.body.telephone1,
        telephone2:null,
        email:null,
        photo:null,
        password:null,
        quartierdistrictId:null,
        observations:null,
        estAlerte:null,
        estSuspendu:null,
        estActif:1,
        creationDate:null,
        creationUserId:null,
        modifDate:null,
        modifUserId:null,
        debutDonnees:null,
        finDonnees:null
    }

    User.checkIfUserExists(user)
        .then(data=>{
            if(data.length==0){
                return res.status(500).json({error: "cet utilisateur n'existe pas dans notre système"})
            }
            else{
                
                const userInfos={
                    userId: data[0].id,
                    adressIp: null,
                    fin: null,
                    creationUserId: data[0].id
                }
                    bcrypt.compare(req.body.password, data[0].password)
                        .then(()=>{
            
                                        res.status(200).json({
                                            data,
                                            token: jwt.sign(
                                                {userId: user.id},
                                                "mot_de_pass",
                                                {expiresIn:'2h'}
                                            )
                                        })



                                })
                         .catch(()=> res.status(400).json({error: "le mot de pass saisi est incorrect"}))
                   
                         
                    User.addAuserConnexionInstance(userInfos)
                    .then(()=>{})
                    .catch(()=>{})
         
            }

    })
}

//supression en dur
function deleteUser(req, res, next){
    
   User.deleteUserInModel(req,res)
}

//supression logique d'un utilisateur
function disableUser(req, res, next){
    User.disableUserInModel(req,res)
}

function updateUser(req,res, next){
    const user={
        id:null,
        structureId:null,
        prestataireId:null,
        nom:null,
        prenoms:null,
        fonction:null,
        telephone1: req.body.telephone1,
        telephone2:req.body.telephone2,
        email: req.body.email,
        photo:null,
        password:null,
        quartierdistrictId:null,
        observations:null,
        estAlerte:null,
        estSuspendu:null,
        estActif:1,
        creationDate:null,
        creationUserId:null,
        modifDate:null,
        modifUserId:null,
        debutDonnees:null,
        finDonnees:null
    }
     User.checkIfUserExists(user)
         .then(data=>{
                  if(data.length==0){
                   User.updateUserInModel(req, res)
                      .then(()=>res.status(200).json({succes: "La modification de l'utilisateur a réussi"}))
                      .catch(error=> res.status(400).json(error))
                  }
                  else{
                      res.status(400).json({error: "numero ou email existe deja dans notre systeme"});
                  }
             })


}

function getAsingleUser(req, res, next){
    User.getAsingleUserInModel(req)
        .then(users=> res.status(200).json(users))
        .catch(error=> res.status(400).json(error))
}


function getAllUsers(req,res, next){

     User.getAllUsersInModel(req)
        .then(users=> res.status(200).json(users))
        .catch(error=> res.status(400).json(error))
}


 function activateUser(req, res, next){
    User.activateUser(req, res)
    
}

function UpdateUserConnexionInstance(req, res, next){
    User.UpdateUserConnexionInModel(req)
        .then(()=> res.status(400).json({succes: "modification bien réussie"}))
        .catch(error=> res.status(400).json({error}))
}
 
module.exports={
    disableUser,
    deleteUser,
    login,
    addUser,
    updateUser,
    getAsingleUser,
    getAllUsers,
    activateUser,
    UpdateUserConnexionInstance
}