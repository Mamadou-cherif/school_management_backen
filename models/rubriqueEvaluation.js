const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function selectByIdRubriqueEvaluationInModel(id){
  return new Promise((resolve,reject)=> {
    connection.query("CALL rubriqueevaluations_selectById(?)",
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

function selectAllRubriqueEvaluationInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL rubriqueevaluations_selectAll(?,?,?)",
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

function addRubriqueEvaluationInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL rubriqueevaluations_insert(?,?,?)",
          [
           data.libelle,
           data.code,
           data.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        else{
        resolve(results);
        }
       
      })
    )
  })
}

function updateRubriqueEvaluationInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL rubriqueevaluations_update(?,?,?,?,?)",
          [
            data.id, 
            data.libelle,
            data.code,
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
function deleteRubriqueEvaluationInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL rubriqueevaluations_delete(?)",
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
function rubriqueEvaluationSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL rubriqueevaluations_selectBy(? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
             data.libelle,
             data.code,
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
    rubriqueEvaluationSelectByInModel,
    addRubriqueEvaluationInModel,
    updateRubriqueEvaluationInModel,
    selectByIdRubriqueEvaluationInModel,
    selectAllRubriqueEvaluationInModel,
    deleteRubriqueEvaluationInModel
  }