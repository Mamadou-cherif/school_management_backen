const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addBeneficiaireInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_insert(?,?,?)",
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

function beneficiaireSelectBy(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_selectBy(?,?,?,?,?,?,?,?,?,?)",
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

function getBeneficiaireByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_selectById(?)",
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


function disableBeneficiaireInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_disable(?,?,?)",
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
 

function updateBeneficiaireInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_update(?,?,?,?,?)",
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

function getAllBeneficiaireInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL beneficiaires_selectAll(?,?,?)",
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
    addBeneficiaireInModel,
    disableBeneficiaireInModel,
    updateBeneficiaireInModel,
    getBeneficiaireByIdInModel,
    getAllBeneficiaireInModel,
    beneficiaireSelectBy
}