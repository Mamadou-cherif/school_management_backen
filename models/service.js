const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");


function addServiceInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_insert(?,?,?,?,?,?,?,?)",
              [ 
                theReq.structureId,              
                theReq.nom,              
                theReq.responsableService,
                theReq.telephone,
                theReq.responsableService,
                theReq.email,
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

function checkIfServiceExists(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,              
                theReq.structureId,              
                theReq.nom,              
                theReq.responsableService,
                theReq.telephone,
                theReq.responsableService,
                theReq.email,
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

function getServiceByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_selectById(?)",
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


function disableServiceInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_disable(?,?,?)",
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
 

function updateServiceInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_update(?,?,?,?,???,?,?,?,?)",
              [ 
                theReq.id,
                theReq.structureId,              
                theReq.nom,              
                theReq.responsableService,
                theReq.telephone,
                theReq.responsableService,
                theReq.email,
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

function getAllServiceInModel(){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL services_selectAll(?,?,?)",
              [ 
                1,
                null,
                null,
                
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
    addServiceInModel,
    disableServiceInModel,
    updateServiceInModel,
    getServiceByIdInModel,
    getAllServiceInModel,
    checkIfServiceExists
}