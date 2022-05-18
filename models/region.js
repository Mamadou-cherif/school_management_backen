const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function regionSelectByInModel(data){
    console.log(data)
    return new Promise((resolve,reject)=> {
      connection.query("CALL regions_selectBy(?,? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
             data.paysId,
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

  function selectByIdRegionInModel(id){
    return new Promise((resolve,reject)=> {
      connection.query("CALL regions_selectById(?)",
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
  
  function selectAllRegionInModel(theReq){
    return new Promise((resolve,reject)=> {
      connection.query("CALL regions_selectAll(?,?,?)",
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
  
  function addRegionInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL regions_insert(?,?,?,?)",
            [
             data.paysId,
             data.libelle,
             data.code,
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
  
  function updateRegionInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL regions_update(?,?,?,?,?,?)",
            [
              data.id, 
              data.paysId,
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
  function deleteRegionInModel(id){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL regions_delete(?)",
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
 
  module.exports={
    regionSelectByInModel,
    addRegionInModel,
    updateRegionInModel,
    selectByIdRegionInModel,
    selectAllRegionInModel,
    deleteRegionInModel
  }