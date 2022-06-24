const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addProgrammeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_insert(?,?,?,?,?)",
              [ 
                theReq.axeId,
                theReq.code,
                theReq.libelle,
                theReq.description,
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

function programmeSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.axeId,
                theReq.code,
                theReq.libelle,
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

function selectByIdProgrammeInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_selectById(?)",
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


function disableProgrammeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_disable(?,?,?)",
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
 

function updateProgrammeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_update(?,?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.axeId,
                theReq.code,
                theReq.libelle,
                theReq.description,
                theReq.modifDate,
                theReq.modifUserId,
                
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

function selectAllProgrammeInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL programmes_selectAll(?,?,?)",
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

function countAllProgrammeInModel(){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL programmes_countAll()",
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

function programmesSelectByParamsInModel(theReq){
  return new Promise((resolve,reject)=> {

      connection.query("CALL programmes_selectByParams(?,?,?)",
            [ 
              theReq.axeId,
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
    programmesSelectByParamsInModel,
    countAllProgrammeInModel,
    addProgrammeInModel,
    disableProgrammeInModel,
    updateProgrammeInModel,
    selectByIdProgrammeInModel,
    selectAllProgrammeInModel,
    programmeSelectByInModel
}