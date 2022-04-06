const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function checkIfMailExists(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            theReq.body.email,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function addUser(theReq){
  return new Promise((resolve, reject)=>{

    bcrypt.hash(theReq.body.password,8)
    .then(hash=>{
          connection.query("CALL users_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                      [
                        theReq.body.structureId,
                        theReq.body.prestataireId,
                        theReq.body.nom,
                        theReq.body.prenoms,
                        theReq.body.fonction,
                        theReq.body.telephone1,
                        theReq.body.telephone2,
                        theReq.body.email,
                        theReq.body.photo,
                        hash,
                        theReq.body.quartierdistrictId,
                        theReq.body.observations,
                        theReq.body.estAlerte,
                        theReq.body.estSuspendu,
                        theReq.body.creationUserId
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                      reject(err)
                      //connection.end();
                    }
                    
                    resolve(results);
                    // connection.end()
            
          })
      })
      .catch(error=>res.status(400).json({error}))
    })
  
}

//supression en dur
function deleteUserInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_delete(?)",
     [
       theReq.body.id
     ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({succes: "La suppression en dur a échoué"})
        }         
          theResponse.status(200).json({succes: "La suppression en dur a bien reussie"})
      })
  })
}

//supression en logique d'un utilisateur
function disableUserInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_disable(?,?,?)",
     [  
         theReq.body.id,
         theReq.body.modifUserId,
         theReq.body.modifDate
      ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({succes: "La suppression logique a échoué"})
        }
        else{
          theResponse.status(200).json({succes: "La suppression logique a bien reussie"})
        }
      })
  })
}

function updateUserInModel(theReq, theResponse){
  return new Promise((resolve, reject)=>{

    bcrypt.hash(theReq.body.password,8)
    .then(hash=>{
          connection.query("CALL users_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                      [
                        theReq.body.id,
                        theReq.body.structureId,
                        theReq.body.prestataireId,
                        theReq.body.nom,
                        theReq.body.prenoms,
                        theReq.body.fonction,
                        theReq.body.telephone1,
                        theReq.body.telephone2,
                        theReq.body.email,
                        theReq.body.photo,
                        hash,
                        theReq.body.quartierdistrictId,
                        theReq.body.observations,
                        theReq.body.estAlerte,
                        theReq.body.estSuspendu,
                        theReq.body.modifDate,
                        theReq.body.creationUserId
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                     reject(err)
                    }
                    resolve(results)
            
          })
      })
      .catch(error=>res.status(400).json({error}))
    })
}


function getAsingleUserInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_selectById(?)",
          [
            theReq.params.id
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })

}

function getAllUsersInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_selectAll(?,?,?)",
          [
            theReq.body.estActif,
            theReq.body.debut,
            theReq.body.fin
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function activateUser(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_activate(?,?,?)",
     [  
         theReq.body.id,
         theReq.body.modifUserId,
         theReq.body.modifDate
      ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({error: "activation du compte echec"})
        }
        else{
          theResponse.status(200).json({succes: "l'activation du compte a reussi"})
        }
      })
  })
}
module.exports= {
    updateUserInModel,
    checkIfMailExists,
    addUser,
    deleteUserInModel,
    disableUserInModel,
    getAsingleUserInModel,
    getAllUsersInModel,
    activateUser
}