const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();



function addCategorieInvestInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_insert(?,?,?)",
              [ 
                theReq.libelle,
                theReq.code,
                theReq.creationUserId,
                
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

function checkIfCategorieInvestExists(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_selectBy(?,?,?,?,?,?,?,?,?,?)",
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

function getCategorieInvestByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_selectById(?)",
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


function disableCategorieInvestInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_disable(?,?,?)",
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
 

function updateCategorieInvestInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_update(?,?,?,?,?)",
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

function getAllCategorieInvestInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL categorieinvestissements_selectAll(?,?,?)",
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


function deleteCategorieInvestInModel(id){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL categorieinvestissements_delete(?)",
            [ 
              id,
              
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
    deleteCategorieInvestInModel,
    addCategorieInvestInModel,
    disableCategorieInvestInModel,
    updateCategorieInvestInModel,
    getCategorieInvestByIdInModel,
    getAllCategorieInvestInModel,
    checkIfCategorieInvestExists
}