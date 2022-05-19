const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function selectByIdApplicationInModel(id){
  return new Promise((resolve,reject)=> {
    connection.query("CALL applications_selectById(?)",
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

function selectAllApplicationInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL applications_selectAll(?,?,?)",
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

function addApplicationInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL applications_insert(?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
           data.libelle,
           data.description,
           data.logo,
           data.proprietaire,
           data.emplacementLog,
           data.repInstallation,
           data.urlRacine,
           data.emailAdmin,
           data.couleur1Id,
           data.couleur2Id,
           data.version,
           data.observations,
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

function updateApplicationInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL applications_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            data.id, 
            data.libelle,
            data.description,
            data.logo,
            data.proprietaire,
            data.emplacementLog,
            data.repInstallation,
            data.urlRacine,
            data.emailAdmin,
            data.couleur1Id,
            data.couleur2Id,
            data.version,
            data.observations,
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
function deleteApplicationInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL applications_delete(?)",
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
function applicationSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL applications_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              data.id, 
              data.libelle,
              data.description,
              data.logo,
              data.proprietaire,
              data.emplacementLog,
              data.repInstallation,
              data.urlRacine,
              data.emailAdmin,
              data.couleur1Id,
              data.couleur2Id,
              data.version,
              data.observations,
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
    applicationSelectByInModel,
    addApplicationInModel,
    updateApplicationInModel,
    selectByIdApplicationInModel,
    selectAllApplicationInModel,
    deleteApplicationInModel
  }