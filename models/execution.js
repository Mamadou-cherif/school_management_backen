const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function executionSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL executions_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.date,
        theReq.taux,
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



    
function addExecutionInModel(theReq){
 
}





//supression en dur
function deleteExecutionInModel(theReq){
    
}

//supression logique d'un utilisateur
function disableExecutionInModel(id){
}



function updateExecutionInModel(theReq){
    
 
}

function getAsingleExecutionInModel(theReq){

}






module.exports={  
  disableExecutionInModel,
  deleteExecutionInModel,
  addExecutionInModel,
  updateExecutionInModel,
  getAsingleExecutionInModel,
  executionSelectByInModel


}
