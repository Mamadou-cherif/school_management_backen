const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");



 

function InterventionSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL interventions_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prestataireId,
        theReq.projetId,
        theReq.categorie,
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


     
function addInterventionInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL interventions_insert(?,?,?,?,?)",
      [
        theReq.prestataireId,
        theReq.projetId,
        theReq.categorie,
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
function deleteInterventionInModel(theReq){
    
}

//supression logique d'un utilisateur
function disableInterventionInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL interventions_disable(?,?,?)",
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



function updateInterventionInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL interventions_update(?,?,?,?,?,?,?)",
      [ 
        theReq.id,
        theReq.prestataireId,
        theReq.projetId,
        theReq.categorie, 
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

function getAsingleInterventionInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL interventions_selectById(?)",
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
  disableInterventionInModel,
  deleteInterventionInModel,
  addInterventionInModel,
  updateInterventionInModel,
  getAsingleInterventionInModel,
  InterventionSelectByInModel 
}
