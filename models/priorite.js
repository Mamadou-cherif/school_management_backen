const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addPrioriteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_insert(?,?,?)",
              [ 
                theReq.libelle,
                theReq.code,
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

function checkIfPrioriteExists(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_selectBy(?,?,?,?,?,?,?,?,?,?)",
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
    
          ((err,results, fields)=>{
            if(err){
              reject(err)
            }
            resolve(results[0])
          })
        )
      })
}

function getPrioriteByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_selectById(?)",
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


function disablePrioriteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_disable(?,?,?)",
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
 

function updatePrioriteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_update(?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.libelle,
                theReq.code,
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

function getAllPrioriteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL priorites_selectAll(?,?,?)",
              [ 
                theReq.estActif,
                theReq.debut,
                theReq.fin,
                
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
    addPrioriteInModel,
    disablePrioriteInModel,
    updatePrioriteInModel,
    getPrioriteByIdInModel,
    getAllPrioriteInModel,
    checkIfPrioriteExists
}