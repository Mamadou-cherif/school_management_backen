const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addDocumentInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.axeId,
                theReq.programmeId,
                theReq.projetId,
                theReq.prestataireId,
                theReq.structureId,
                theReq.evaluationId,
                theReq.typeDocumentId,
                theReq.reference,
                theReq.debut,
                theReq.fin,
                theReq.copie,
                theReq.renouvelerId,
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

function documentSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.axeId,
                theReq.programmeId,
                theReq.projetId,
                theReq.prestataireId,
                theReq.structureId,
                theReq.evaluationId,
                theReq.typeDocumentId,
                theReq.reference,
                theReq.debut,
                theReq.fin,
                theReq.copie,
                theReq.renouvelerId,
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

function selectByIdDocumentInModel(id){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_selectById(?)",
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


function disableDocumentInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_disable(?,?,?)",
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
 

function updateDocumentInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [ 
                theReq.id,
                theReq.axeId,
                theReq.programmeId,
                theReq.projetId,
                theReq.prestataireId,
                theReq.structureId,
                theReq.evaluationId,
                theReq.typeDocumentId,
                theReq.reference,
                theReq.debut,
                theReq.fin,
                theReq.copie,
                theReq.renouvelerId,
                theReq.observations,
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

function selectAllDocumentInModel(theReq){
    return new Promise((resolve,reject)=> {
    
        connection.query("CALL documents_selectAll(?,?,?)",
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
    addDocumentInModel,
    disableDocumentInModel,
    updateDocumentInModel,
    selectByIdDocumentInModel,
    selectAllDocumentInModel,
    documentSelectByInModel
}