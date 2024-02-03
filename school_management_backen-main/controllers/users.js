const User = require("../models/users")
const md5 = require("md5")
const userConnexion = require("../models/userConnexion")
const userPassword = require("../models/userPassword")
const jwt = require("../services/jwt")
const crypto = require('crypto');
const multersd = require('multer')
const path = require('path');
const fs = require("fs")
const UserGroupeModel = require('../models/userGroupes')


let imageUrl = '';


const storage = multersd.diskStorage({
    destination: './uploads/users',
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err);
            let derniereImage = raw.toString('hex') + path.extname(file.originalname);
            callback(null, derniereImage);
        })
    }
})

const upload = multersd({ storage: storage });
const singleUpload = upload.single('image');

function files(req, res, next) {
    try {
        singleUpload(req, res, function (err) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
            }
            if (!req.file.originalname.match(/\.(jpg|png|jpeg|pdf)$/)) {
                return res.status(400).json({ msg: 'only image autoried' })
            }
            imageUrl = req.file.filename;
            return res.json({ 'imageUrl': imageUrl });
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}


function addUser(req, res, next) {
    const objUser1 = {
        telephone: req.body.telephone,
        estActif: 1
    }
    User.checkIfUserExists(objUser1)
        .then(user => {
            if (user.length == 0) {
                const userInsert = {
                    name: req.body.name,
                    ecoleId: req.body.ecoleId,
                    prenoms: req.body.prenoms,
                    telephone: req.body.telephone,
                    fonction: req.body.fonction,
                    email: req.body.email,
                    password: md5(req.body.password),
                    adresse: req.body.adresse,
                    creationUserId: req.body.creationUserId
                }
                User.addUserInModel(userInsert)
                    .then(user => {
                        /// 
                        
                        if(req.body.ajoutEnseignant == 'oui'){
                            const usergroupeObj={
                            body:{
                             groupeId: 18,
                             userId: user[0].lastUserId,
                             creationUserId: req.body.creationUserId
                            }
                        }
                            UserGroupeModel.addUserGroupeInModel(usergroupeObj)
                            .then(()=>{})
                            .catch(()=>{})
                        }
                       
                        res.status(201).json(user)
                    })
                    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké" }));
            }
            else {
                res.status(500).json({ error: "cet utilisateur existe déjà" })
            }
        })
        .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stocké" }))
}

function getImageFile(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './uploads/users/' + image_file;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }
    });
}

function login(req, res, next) {
    bool = false
    const login = {
        // telephone: req.body.indicatifTel + req.body.telephone,
        telephone:  req.body.telephone,
        // motDePasse: md5(req.body.password)
    }
    User.checkIfUserExists(login)
        .then(data=>{
            if(data.length == 0){
                return res.status(500).json({error: "cet utilisateur n'existe pas dans notre système!"})
            }
            else{
                if(data[0].password == md5(req.body.password)){
                    const userconnect = {
                        userId: data[0].id,
                        creationdataId: data[0].creationUserId,
                        adressIp: null,
                        fin: null,
                    }
                    

                    userConnexion.userConnexionInsertInModel(userconnect)
                        .then(() => { })
                        .catch(() => { })
                    // data[0].telephone2 = 
                    res.status(200).json({
                        // customisePassword: false,
                        data,
                        token: jwt.createtoken(data)
                    })
                }
                else{
                    return res.status(500).json({error: "Le mot de passe saisi est incorrect"})   
                }
            }
        })
        .catch(error=>res.status(200).json(error))

}

//supression en dur
function deleteUser(req, res, next) {

    User.deleteUserInModel(req, res)
}

//supression logique d'un utilisateur
function disableUser(req, res, next) {
    User.disableUserInModel(req, res)
}

function updateUser(req, res, next) {
    const user = {
        telephone: req.body.telephone,
        estActif: 1
    }
    User.checkIfUserExists(user)
        .then(data => {
            if ((data.length == 0) || (data[0].id == req.body.id)) {

                const objUser = {
                    id: req.body.id,
                    name: req.body.name,
                    ecoleId: req.body.ecoleId,
                    prenoms: req.body.prenoms,
                    telephone: req.body.telephone,
                    fonction: req.body.fonction,
                    email: req.body.email,
                    password: req.body.password,
                    adresse: req.body.adresse,
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId
                }


                User.updateUserInModel(objUser)
                    .then(() => { return res.status(200).json({ succes: "La modification de l'utilisateur a réussi" }) })
                    .catch(error => res.status(400).json(error))

            }

        })
        .catch(error => res.status(400).json(error))


}

function getEnseignantNotAffectedToClasses(req, res, next){
    const userObj= {
        ecoleId: req.body.ecoleId || null, 
    }

    User.getEnseignantNotAffectedToClasses(userObj)
    .then(user=>res.status(200).json(user))
    .catch(error=>res.status(400).json(error))
}

function userSelectBy(req, res, next){
    const userObj= {
        id: req.body.id || null, 
        ecoleId: req.body.ecoleId || null, 
        name: req.body.name || null, 
        prenoms: req.body.prenoms || null, 
        fonction: req.body.fonction || null, 
        telephone: req.body.telephone || null, 
        password: req.body.password || null, 
        adresse: req.body.adresse || null, 
        estActif: 1, 
        creationDate: req.body.creationDate || null, 
        creationUserId: req.body.creationUserId || null, 
        modifDate: req.body.modifDate || null, 
        modifUserId: req.body.modifUserId || null, 
    }

    User.checkIfUserExists(userObj)
    .then(user=>res.status(200).json(user))
    .catch(error=>res.status(400).json(error))
}

function updatePassword(req, res, next) {

    const userUpdPwd = {
        id: req.body.id,
        newMotDePasse: md5(req.body.newMotDePasse),
        modifUserId: req.body.modifUserId,
    }
    User.userUpdatePasswordInModel(userUpdPwd)
        .then(() =>  { 
            const userIstPwt = {
                userId: req.body.id,
                type: "Perso",
                creationUserId: req.body.creationUserId
            }
            userPassword.userPasswordInsertInModel(userIstPwt)
                .then(() => { return res.status(201).json({succes: "changement du mot de passe reussi"})} )
                .catch(error => res.status(400).json(error))
        })
        .catch(error => res.status(400).json(err))



}

function getEnseignantByEcoleId(req, res, next) {
    const obj={
        ecoleId: req.body.ecoleId
    }
    User.getEnseignantByEcoleId(obj)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
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


function userSelectBy(req, res, next) {
    const objUser = {
        id: req.body.id || null,
        ecoleId: req.body.ecoleId || null,
        name: req.body.name || null,
        prenoms: req.body.prenoms || null,
        fonction: req.body.fonction || null,
        telephone: req.body.telephone || null,
        email: req.body.email || null,
        password: req.body.password || null,
        adresse: req.body.adresse || null,
     
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debutDonnees: req.body.debutDonnees || null,
        finDonnees: req.body.finDonnees || null,
    }

    User.checkIfUserExists(objUser)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
}

module.exports = {
    userSelectBy,
    getAffecteByGroup,
    getNonAffecteByGroup,
    disableUser,
    deleteUser,
    login,
    addUser,
    updateUser,
    getEnseignantNotAffectedToClasses,
    getAsingleUser,
    getAllUsers,
    activateUser,
    updatePassword,
    userSelectBy,
    files,
    getEnseignantByEcoleId,
    getImageFile
}