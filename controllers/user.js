const User= require("../models/user")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")


function addUser(req, res,next){
    // verifie si l'email saisi existe en base
   User.checkIfMailExists(req)
        .then(user=> { 
             if(user.length==0){
                  User.addUser(req)
                      .then(()=> res.status(201).json({succes: "la création a reussi"}))
                      .catch(()=> res.status(400).json({error: "erreur de la procédure stocké"}));
             }
             else
                {

3                }
        })
        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stocké"}))
}


function login(req, res, next){
    User.checkIfMailExists(req)
        .then(user=>{
            if(user.length==0){
                return res.status(500).json({error: "cet utilisateur n'existe pas dans notre système"})
            }
            else
            bcrypt.compare(req.body.password, user[0].password)
                .then(()=>{
                            res.status(200).json({
                                user,
                                token: jwt.sign(
                                    {userId: user.id},
                                    "mot_de_pass",
                                    {expiresIn:'2h'}
                                )
                            })

                      })
                      .catch(()=> res.status(400).json({error: "le mot de pass saisi est incorrect"}))
             
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
    User.updateUserInModel(req, res)
        .then(()=>res.status(200).json({succes: "La modification de l'utilisateur a réussi"}))
        .catch(error=> res.status(400).json(error))
}

function getAsingleUser(req, res, next){
    User.getAsingleUserInModel(req)
        .then(users=> res.status(200).json(users))
        .catch(error=> res.status(400).json(error))
}


function getAllUsers(req,res, next){
    User.getAllUsersInModel(req)
        .then(users=> res.status(200).json(users))
        .catch(error=> res.status(400).json({error}))
}


 function activateUser(req, res, next){
    User.activateUser(req, res)
}

module.exports={
    disableUser,
    deleteUser,
    login,
    addUser,
    updateUser,
    getAsingleUser,
    getAllUsers,
    activateUser
}