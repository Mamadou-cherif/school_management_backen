const User = require("../models/users")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
//const jwt= require("../services/jwt")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initUserClass = require("../classes/users")
const md5 = require("md5")
const initUserConnexion = require("../classes/userConnexion")
const userConnexion = require("../models/userConnexion")
const userPassword = require("../models/userPassword")
const initUserPassword = require("../classes/userPassword")
const jwt = require("../services/jwt")

function addUser(req, res,next){
    initUserClass.user.telephone1= req.body.indicatifTel.toString() + req.body.telephone1
     const  objUser1={
        telephone1:req.body.indicatifTel.toString() + req.body.telephone1,
        estActif:1
    }
   

     //verifie si l'utilisateur existe en base
     User.checkIfUserExists(objUser1)
          .then(user=> {
                if(user.length==0){ 
                    if(req.body.telephone2){

                        initUserClass.user.telephone2= req.body.indicatifTel.toString() + req.body.telephone2
                    }else{
                        initUserClass.user.telephone2= null
                    }
                    const userInsert={
                        structureId:req.body.structureId,
                        prestataireId: req.body.prestataireId,
                        nom:req.body.nom,
                        prenoms:req.body.prenoms,
                        fonction:req.body.fonction, 
                        telephone1: initUserClass.user.telephone1, 
                        telephone2 :initUserClass.user.telephone2, 
                        email:req.body.email, 
                        photo:"",
                        password: md5(req.body.password),
                        quartierdistrictId: req.body.quartierdistrictId,
                        observations:req.body.observations,
                        estAlerte:   0, 
                        estSuspendu : 0,
                        creationUserId:req.body.creationUserId
                       
                        }
               
                User.addUserInModel(userInsert)
                    .then(donnee => {

                        const userIstPwt = {
                            userId: donnee[0].lastId,
                            type: "Auto",
                            creationUserId: req.body.creationUserId
                        }
                        userPassword.userPasswordInsertInModel(userIstPwt, res)
                            .then(() => { })
                            .catch(() => { })
                        res.status(201).json({ succes: "La creation a reussi" })
                    })
                    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké" }));
            }
            else {
                res.status(500).json({ error: "cet utilisateur existe déjà" })
            }
        })
        .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stocké" }))

}



function login(req, res, next) {
    bool = false
    const login = {
        telephone1: req.body.indicatifTel + req.body.telephone1,
        motDePasse: md5(req.body.password)
    }
    User.getNbAuthenticateInModel(login)
        .then(data => {

            if (data[0].nombre > 0) {
                User.getAuthenticateInModel(login)
                    .then(user => {


                        if (user) {

                            //Si le mot de passe saisi et le mot de passe en base sont identiques 
                            //  if(user[0].password==login.motDePasse){

                            initUserConnexion.userConnexion.debutDonnees = 0
                            initUserConnexion.userConnexion.finDonnees = 1
                            initUserConnexion.userConnexion.estActif = 1
                            initUserConnexion.userConnexion.userId = user[0].id
                            userConnexion.userConnexionSelectByInModel(initUserConnexion.userConnexion)
                                .then(data => {
                                    if (data.length == 0) {
                                        bool = true
                                    } else {
                                        if (data[0].fin == null) {


                                            //   console.log(data[0].creationDate)
                                            //var lastConnexion=data[0].creationDate;

                                            //    const lastConnexion1 = new Date(lastConnexion);
                                            //     console.log(lastConnexion1)
                                            //      var now = new Date();
                                            //      const diffInMs = Math.abs(lastConnexion - now);
                                            //      const  enMinute= diffInMs / (1000 * 60);
                                            //      console.log(enMinute)
                                            // console.log(now) 
                                            // if(differenceTime>15){
                                            //     $bool=true;
                                            // }
                                            // else{
                                            //     bool=false;
                                            // }
                                            bool = true
                                        }
                                        else {
                                            bool = true
                                        }
                                    }
                                    if (bool) {
                                        initUserPassword.userPassword.userId = user[0].id
                                        initUserPassword.userPassword.estActif = 1
                                        initUserPassword.userPassword.debutDonnees = 0
                                        initUserPassword.userPassword.finDonnees = 1

                                        userPassword.userPasswordSelectByInModel(initUserPassword.userPassword)
                                            .then(userpassword => {
                                                if (userpassword[0].type == "Auto") {
                                                    return res.status(200).json({ customisePassword: true })
                                                }
                                                else {
                                                    console.log(user)
                                                    const userconnect = {
                                                        userId: user[0].id,
                                                        creationUserId: user[0].creationUserId,
                                                        adressIp: null,
                                                        fin: null,
                                                    }

                                                    userConnexion.userConnexionInsertInModel(userconnect)
                                                        .then(() => { })
                                                        .catch(() => { })
                                                    user.telephone2 = undefined
                                                    res.status(200).json({
                                                        customisePassword: false,
                                                        user,
                                                        token: jwt.createtoken(user)
                                                    })
                                                }
                                            })
                                    }
                                    else {

                                    }
                                })
                                .catch(error => res.status(400).json(error))
                            // }
                            // else{
                            //     return res.status(500).json({error: "le mot de pass saisi est invalid"})
                            // }

                        }
                        else {
                            return res.status(500).json({ error: "vos identifiants sont incorrects." })
                        }



                    })
                    .catch(error => res.status(400).json(error))
            }
            else {
                return res.status(500).json({ message: "identifiants invalides" })
            }
        })
        .catch(error => res.status(400).json(error))

}

//supression en dur
function deleteUser(req, res, next) {

    User.deleteUserInModel(req, res)
}

//supression logique d'un utilisateur
function disableUser(req, res, next) {
    User.disableUserInModel(req, res)
}

function updateUser(req,res, next){
    const user={
        telephone1: req.body.telephone1,
        estActif:1
    }
    User.checkIfUserExists(user)
        .then(data => {
            if ((data.length == 0) || (data[0].id == req.body.id)) {

                const objUser = {
                    id: req.body.id,
                    structureId: req.body.structureId,
                    prestataireId: req.body.prestataireId,
                    nom: req.body.nom,
                    prenoms: req.body.prenoms,
                    fonction: req.body.fonction,
                    telephone1: req.body.telephone1,
                    telephone2: req.body.telephone2,
                    email: req.body.email,
                    photo: "",
                    password: req.body.password,
                    quartierdistrictId: req.body.quartierdistrictId,
                    observations: req.body.observations,
                    estAlerte: 1,
                    estSuspendu: 0,
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId
                }

                console.log(objUser)
                User.updateUserInModel(objUser)
                    .then(() => { return res.status(200).json({ succes: "La modification de l'utilisateur a réussi" }) })
                    .catch(error => res.status(400).json(error))

            }

        })
        .catch(error => res.status(400).json(error))


}


function updatePassword(req, res, next) {

    const userUpdPwd = {
        id: req.body.id,
        newMotDePasse: md5(req.body.newMotDePasse),
        modifUserId: req.body.modifUserId,
    }

    const userIstPwt = {
        userId: req.body.id,
        type: "Perso",
        creationUserId: req.body.id
    }
    User.userUpdatePasswordInModel(userUpdPwd, res)
        .then(() => { })
        .catch(error => res.status(400).json({ error }))


    userPassword.userPasswordInsertInModel(userIstPwt, res)
        .then(() => { })
        .catch(() => { })

}

function getAsingleUser(req, res, next) {
    User.getAsingleUserInModel(req)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
}


function getAllUsers(req, res, next) {

    User.getAllUsersInModel(req)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
}


function activateUser(req, res, next) {
    User.activateUser(req, res)

}

function getNonAffecteByGroup(req, res, next) {
    User.getNonAffecteByGroupInModel(req)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
}

function getAffecteByGroup(req, res, next) {
    User.getAffecteByGroupInModel(req)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
}
module.exports = {
    getAffecteByGroup,
    getNonAffecteByGroup,
    disableUser,
    deleteUser,
    login,
    addUser,
    updateUser,
    getAsingleUser,
    getAllUsers,
    activateUser,
    updatePassword
}