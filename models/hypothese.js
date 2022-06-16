const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");



 function getAsingleHypotheseInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL hypotheses_selectById(?)",
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


 function hypotheseSelectByInModel(theReq){
   console.log(theReq)
  return new Promise((resolve, reject) => {
    connection.query("CALL hypotheses_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.chaineResultatId,
        theReq.libelle,
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
     
function addHypotheseInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL hypotheses_insert(?,?,?)",
      [
        theReq.chaineResultatId,
        theReq.libelle,
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
function deleteHypotheseInModel(theReq){
    
}

//supression logique d'un utilisateur
function disableHypotheseInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL hypotheses_disable(?,?,?)",
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



function updateHypotheseInModel(theReq){
  return new Promise((resolve, reject) => {
    connection.query("CALL hypotheses_update(?,?,?,?,?)",
      [
        theReq.id,
        theReq.chaineResultatId,
        theReq.libelle,
        theReq.modifDate,
        theReq.modifUserId
      ],

      ((err, results, fields) => {
        if (err) {
          // console.log(err)
          reject(err)
        }
        else{
        resolve(results[0])

        }
      })
    )
  })
  
}

function getAsingleHypotheseInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL hypotheses_selectById(?)",
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
  disableHypotheseInModel,
  deleteHypotheseInModel,
  addHypotheseInModel,
  updateHypotheseInModel,
  getAsingleHypotheseInModel,
  hypotheseSelectByInModel 
}







module.exports={  
  disableHypotheseInModel,
  deleteHypotheseInModel,
  addHypotheseInModel,
  updateHypotheseInModel,
  getAsingleHypotheseInModel,
  hypotheseSelectByInModel
}








