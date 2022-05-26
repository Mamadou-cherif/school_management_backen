const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function investissementSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL investissements_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.categorieInvestId,
        theReq.libelle,
        theReq.unite,
        theReq.quantite,
        theReq.uniteId,
        theReq.cout,
        theReq.deviseId,
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


 
     
function addInvestissementInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL investissements_insert(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.projetId,
        theReq.categorieInvestId,
        theReq.libelle,
        theReq.unite,
        theReq.quantite,
        theReq.uniteId,
        theReq.cout,
        theReq.deviseId,
        theReq.observations,
        theReq.creationUserId,
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
function deleteInvestissementInModel(theReq){
    
}

//supression logique d'un utilisateur
function disableInvestissementInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL investissements_disable(?,?,?)",
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



function updateInvestissementInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL investissements_update(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.categorieInvestId,
        theReq.libelle,
        theReq.unite,
        theReq.quantite,
        theReq.uniteId,
        theReq.cout,
        theReq.deviseId,
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

function getAsingleInvestissementInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL investissements_selectById(?)",
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
  disableInvestissementInModel,
  deleteInvestissementInModel,
  addInvestissementInModel,
  updateInvestissementInModel,
  getAsingleInvestissementInModel,
  investissementSelectByInModel 
}






