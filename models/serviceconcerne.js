const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addServiceConcerneInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_insert(?,?,?,?)",
              [ 
                theReq.projetId,              
                theReq.serviceId,              
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

function checkIfServiceConcerneExists(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_selectBy(?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,              
                theReq.projetId,              
                theReq.serviceId,              
                theReq.observations,              
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

function getServiceConcerneByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_selectById(?)",
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


function disableServiceConcerneInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_disable(?,?,?)",
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
 

function updateServiceConcerneInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_update(?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.projetId,              
                theReq.serviceId,              
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

function getAllServiceConcerneInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL serviceconcernes_selectAll(?,?,?)",
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
    addServiceConcerneInModel,
    disableServiceConcerneInModel,
    updateServiceConcerneInModel,
    getServiceConcerneByIdInModel,
    getAllServiceConcerneInModel,
    checkIfServiceConcerneExists
}