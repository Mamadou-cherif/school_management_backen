const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function indicateurSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL indicateurs_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.chaineResultatId,
        theReq.libelle,
        theReq.valeurInitiale,
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


     
function addIndicateurInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL indicateurs_insert(?,?,?,?,?)",
      [
        theReq.chaineResultatId,
        theReq.libelle,
        theReq.valeurInitiale,
        theReq.observations,
        theReq.creationUserId
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
          resolve(results[0])
        }
        
      })
    )
  })
}





//supression en dur
function deleteIndicateurInModel(theReq){
    
}

//supression logique d'un utilisateur
function disableIndicateurInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL indicateurs_disable(?,?,?)",
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



function updateIndicateurInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL indicateurs_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.chaineResultatId,
        theReq.libelle,
        theReq.valeurInitiale,
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

function getAsingleIndicateurInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL indicateurs_selectById(?)",
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


function getAllIndicateurInModel(){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL indicateurs_selectAll(?,?,?)",
          [ 
            1,
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


module.exports={  
  disableIndicateurInModel,
  deleteIndicateurInModel,
  addIndicateurInModel,
  updateIndicateurInModel,
  getAsingleIndicateurInModel,
  indicateurSelectByInModel ,
  getAllIndicateurInModel
}




