const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function selectByIdTypeDocumentInModel(id){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typedocuments_selectById(?)",
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

function selectAllTypeDocumentInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typedocuments_selectAll(?,?,?)",
          [
           1,
            null,
            null
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

function addTypeDocumentInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typedocuments_insert(?,?,?)",
          [
           data.libelle,
           data.categorie,
           data.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){

          reject(err)
          //connection.end();
        }
        else{
        resolve(results);
        }
       
      })
    )
  })
}

function updateTypeDocumentInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typedocuments_update(?,?,?,?,?)",
          [
            data.id, 
            data.libelle,
            data.categorie,
            data.modifDate,
            data.modifUserId,
          ],

      ((err,results, fields)=>{
        if(err){

          reject(err)
          //connection.end();
        }
        else{
        resolve(results);
        }
       
      })
    )
  })
}
function deleteTypeDocumentInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL typedocuments_delete(?)",
          [ 
            id,
            
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }else{
           resolve(results[0])
        }
       
      })
    )
  })
}
function typeDocumentSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL typedocuments_selectBy(? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
             data.libelle,
             data.categorie,
             data.estActif,
             data.creationDate,
             data.creationUserId,
             data.modifDate,
             data.modifUserId,
             data.debutDonnees,
             data.finDonnees
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
    typeDocumentSelectByInModel,
    addTypeDocumentInModel,
    updateTypeDocumentInModel,
    selectByIdTypeDocumentInModel,
    selectAllTypeDocumentInModel,
    deleteTypeDocumentInModel
  }