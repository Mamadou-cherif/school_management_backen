const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addAxeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_insert(?,?,?,?)",
              [ 
                theReq.libelle,
                theReq.code,
                theReq.description,
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

function axeSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.libelle,
                theReq.code,
                theReq.description,
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

function getAxeByIdInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_selectById(?)",
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


function disableAxeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_disable(?,?,?)",
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
 

function updateAxeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_update(?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.libelle,
                theReq.code,
                theReq.description,
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

function getAllAxeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL axes_selectAll(?,?,?)",
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

function countAllAxeInModel(){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL axes_countAll()",
            [],
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }
          resolve(results[0])
        })
      )
    })
}

function axesSelectByParamsInModel(theReq){
  return new Promise((resolve,reject)=> {

      connection.query("CALL axes_selectByParams(?,?)",
            [ 
              theReq.debut,
              theReq.fin,
              
            ],
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }else{}
          resolve(results[0])
        })
      )
    })
}
module.exports={
    addAxeInModel,
    disableAxeInModel,
    updateAxeInModel,
    getAxeByIdInModel,
    getAllAxeInModel,
    axeSelectByInModel,
    countAllAxeInModel,
    axesSelectByParamsInModel
}