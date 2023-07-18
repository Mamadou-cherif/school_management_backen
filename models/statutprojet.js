const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addStatutProjetInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_insert(?,?,?)",
              [ 
                theReq.libelle,              
                theReq.observations, 
                theReq.creationUserId
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

function checkIfStatutProjetExists(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_selectBy(?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,              
                theReq.libelle,              
                theReq.observations,              
                theReq.estActif,
                theReq.creationDate,
                theReq.creationUserId,
                theReq.modifDate,
                theReq.modifUserId
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

function getStatutProjetByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_selectById(?)",
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


function disableStatutProjetInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_disable(?,?,?)",
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
 
function deleteStatutProjetInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL statuts_delete(?)",
      [
        id,

      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else {
          resolve(results[0]);
        }

      })
    )
  })
}

function updateStatutProjetInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_update(?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.libelle,
                theReq.observations,
                theReq.modifDate,
                theReq.modifUserId
                
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

function getAllStatutProjetInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL statuts_selectAll(?,?,?)",
              [ 
                1,
               null,
                null,
                
              ],
    
          ((err,results, fields)=>{
            if(err){
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

module.exports={
    addStatutProjetInModel,
    disableStatutProjetInModel,
    updateStatutProjetInModel,
    getStatutProjetByIdInModel,
    getAllStatutProjetInModel,
    checkIfStatutProjetExists,
    deleteStatutProjetInModel
}