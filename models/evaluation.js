const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function disableEvaluationInModel(theReq){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL evaluations_disable(?,?,?)",
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

function getAllEvaluationInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL evaluations_selectAll(?,?,?)",
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



function evaluationSelectByIdInModel(id){
  return new Promise((resolve,reject)=> {

    connection.query("CALL evaluations_selectById(?)",
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


function addEvaluationInModel(theReq){

  return new Promise((resolve,reject)=> {
    connection.query("CALL evaluations_insert(?,?,?,?,?)",
          [
            theReq.valeurCibleId,
            theReq.tauxAtteint,
            theReq.observations,
            theReq.creationDate,
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


function evaluationSelectBy(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL evaluations_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            theReq.id, 
            theReq.valeurCibleId,
            theReq.tauxAtteint,
            theReq.observations,
            theReq.estActif,
            theReq.creationDate,
            theReq.creationUserId,
            theReq.modifDate,
            theReq.modifUserId,
            theReq.debutDonnees,
            theReq.finDonnees,
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

function updateEvaluationInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL evaluations_update(?,?,?,?,?,?)",
          [
            theReq.id, 
            theReq.valeurCibleId,
            theReq.tauxAtteint,
            theReq.observations,
            theReq.modifDate,
            theReq.modifUserId,
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


module.exports = {
  getAllEvaluationInModel,
  updateEvaluationInModel,
  evaluationSelectBy,
  addEvaluationInModel,
  evaluationSelectByIdInModel,
  disableEvaluationInModel
}