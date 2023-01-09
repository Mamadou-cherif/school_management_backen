const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function niveauscolaireSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL niveauscolaires_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
		theReq.libelle,    
		theReq.code,    
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



function disableNiveauScolaireInModel(theReq){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL niveauscolaires_disable(?,?,?)",
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

function getAllNiveauScolaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL niveauscolaires_selectAll(?,?,?)",
      [
        1,
        null,
        null
      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else{
             resolve(results[0])
        }
      })
    )
  })
}



function niveauscolaireSelectByIdInModel(id){
  return new Promise((resolve,reject)=> {

    connection.query("CALL niveauscolaires_selectById(?)",
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


function addNiveauScolaireInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL niveauscolaires_insert(?,?,?)",
          [
            theReq.libelle,    
		    theReq.code, 
            theReq.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
          //connection.end();
        }
        else{
        resolve(results);
        }

      })
    )
  })
}




function updateNiveauScolaireInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL niveauscolaires_update(?,?,?,?,?)",
          [
            theReq.id, 
            theReq.libelle,    
		    theReq.code, 
            theReq.modifDate,
            theReq.modifUserId,
          ],

      ((err,results, fields)=>{
        if(err){   
          reject(err)
        }
        else{
        resolve(results);
        }

      })
    )
  })
}


module.exports = {
  getAllNiveauScolaireInModel,
  updateNiveauScolaireInModel,
  addNiveauScolaireInModel,
  niveauscolaireSelectByIdInModel,
  disableNiveauScolaireInModel,
  niveauscolaireSelectByInModel
}