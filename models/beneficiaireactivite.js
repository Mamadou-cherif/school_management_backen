const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addBeneficiaireActiviteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_insert(?,?,?)",
              [ 
                theReq.activiteId,              
                theReq.beneficiaireId,      
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

function benefactiviteSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_selectBy(?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,              
                theReq.activiteId,              
                theReq.beneficiaireId,              
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

function getBeneficiaireActiviteByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_selectById(?)",
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


function disableBeneficiaireActiviteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_disable(?,?,?)",
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
 

function updateBeneficiaireActiviteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_update(?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.activiteId,              
                theReq.beneficiaireId,      
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

function getAllBeneficiaireActiviteInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL benefactivites_selectAll(?,?,?)",
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
    addBeneficiaireActiviteInModel,
    disableBeneficiaireActiviteInModel,
    updateBeneficiaireActiviteInModel,
    getBeneficiaireActiviteByIdInModel,
    getAllBeneficiaireActiviteInModel,
    benefactiviteSelectByInModel
}