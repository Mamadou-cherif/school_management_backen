const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function getAllChaineInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL chaineresultats_selectAll(?,?,?)",
      [
        1,
        null,
        null
      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}

function chainederesultatSelectByInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL chaineresultats_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.rubriqueId,
        theReq.libelle,
        theReq.sourceMoyenVerif,
        theReq.observations,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
        theReq.modifDate,
        theReq.modifUserId,
        theReq.debutDonnees,
        theReq.finDonnees

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}



     
function addChaineResultatInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL chaineresultats_insert(?,?,?,?,?,?)",
      [
        theReq.projetId,
        theReq.rubriqueId,
        theReq.libelle,
        theReq.sourceMoyenVerif,
        theReq.observations,
        theReq.creationUserId


      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}





//supression en dur
function deleteChaineResultatInModel(theReq){
    
}

//supression logique d'un utilisateur

function disableChaineResultatInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL chaineresultats_disable(?,?,?)",
          [ 
            theReq.id,
            theReq.modifUserId,
            theReq.modifDate,
            
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



function updateChaineResultatInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL chaineresultats_update(?,?,?,?,?,?,?,?)",
      [

        theReq.id,
        theReq.projetId,
        theReq.rubriqueId,
        theReq.libelle,
        theReq.sourceMoyenVerif,
        theReq.observations,
        theReq.modifDate,
        theReq.modifUserId


      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
 
}

function getAsingleChaineResultatInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL chaineresultats_selectById(?)",
          [ 
            id
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






module.exports={  
  disableChaineResultatInModel,
  deleteChaineResultatInModel,
  addChaineResultatInModel,
  updateChaineResultatInModel,
  getAsingleChaineResultatInModel,
  getAllChaineInModel,
  chainederesultatSelectByInModel,
}


