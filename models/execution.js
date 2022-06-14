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



function disableExecutionInModel(theReq){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL executions_disable(?,?,?)",
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

function getAllExecutionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL executions_selectAll(?,?,?)",
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



function executionSelectByIdInModel(id){
  return new Promise((resolve,reject)=> {

    connection.query("CALL executions_selectById(?)",
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


function addExecutionInModel(theReq){

  return new Promise((resolve,reject)=> {
    connection.query("CALL executions_insert(?,?,?,?,?)",
          [
            theReq.projetId,
            theReq.date,
            theReq.taux,
            theReq.observations,
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




function updateExecutionInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL executions_update(?,?,?,?,?,?,?)",
          [
            theReq.id, 
            theReq.projetId,
            theReq.date,
            theReq.taux,
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
  getAllExecutionInModel,
  updateExecutionInModel,
  addExecutionInModel,
  executionSelectByIdInModel,
  disableExecutionInModel,
  executionSelectByInModel
}