const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")





function budgetPrevisionnelSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL budgetprevisionnels_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.anneeCibleId,
        theReq.montant,
        theReq.deviseId,
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
     
function addBudgetPrevisionnelInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL budgetprevisionnels_insert(?,?,?,?,?)",
      [
        theReq.projetId,
        theReq.anneeCibleId,
        theReq.montant,
        theReq.deviseId,
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





//supression logique d'un utilisateur
function disableBudgetPrevisionnelInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL budgetprevisionnels_disable(?,?,?)",
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



function updateBudgetPrevisionnelInModel(theReq){
  return new Promise((resolve, reject) => {
    connection.query("CALL budgetprevisionnels_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.anneeCibleId,
        theReq.montant,
        theReq.deviseId,
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

function getAsingleBudgetPrevisionnelInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL budgetprevisionnels_selectById(?)",
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
  disableBudgetPrevisionnelInModel,
  addBudgetPrevisionnelInModel,
  updateBudgetPrevisionnelInModel,
  getAsingleBudgetPrevisionnelInModel,
  budgetPrevisionnelSelectByInModel 
}




