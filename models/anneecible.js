const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();



function addAnneeCibleInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL anneecibles_insert(?,?,?)",
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

function AnneeCibleSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL anneecibles_selectBy(?,?,?,?,?,?,?,?,?,?)",
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

function anneCibleSelectById(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL anneecibles_selectById(?)",
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


function disableAnneeCibleInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL anneecibles_disable(?,?,?)",
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
 

function updateAnneeCibleInModel(theReq){
    return new Promise((resolve,reject)=> {
        connection.query("CALL anneecibles_update(?,?,?,?,?)",
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

function getAllAnneeCibleInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL anneecibles_selectAll(?,?,?)",
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


function deleteAnneeCibleInModel(id){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL anneecibles_delete(?)",
            [ 
              id
              
            ],
  
        ((err,results, fields)=>{
          if(err){
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
    deleteAnneeCibleInModel,
    addAnneeCibleInModel,
    disableAnneeCibleInModel,
    updateAnneeCibleInModel,
    anneCibleSelectById,
    getAllAnneeCibleInModel,
    AnneeCibleSelectByInModel
}