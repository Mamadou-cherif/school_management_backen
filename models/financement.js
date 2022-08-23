const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addFinancementInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL financement_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.projetId,
        theReq.structureId,
        theReq.type,
        theReq.typeAppui,
        theReq.taux,
        theReq.activiteId,
        theReq.observations,
        theReq.creationUserId
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else {
          resolve(results[0])
        }
      })
    )
  })
}

function financementSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL financement_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.structureId,
        theReq.type,
        theReq.typeAppui,
        theReq.taux,
        theReq.activiteId,
        theReq.observations,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
        theReq.modifDate,
        theReq.modifUserId,
        theReq.debutDonnees,
        theReq.finDonnees

      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
          resolve(results[0])
        }
        
      })
    )
  })
}

function getFinancementByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL financement_selectById(?)",
      [
        id

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function disableFinancementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL financement_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function updateFinancementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL financement_update(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.structureId,
        theReq.type,
        theReq.typeAppui,
        theReq.taux,
        theReq.activiteId,
        theReq.observations,
        theReq.modifDate,
        theReq.modifUserId

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}

function getAllFinancementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL financement_selectAll(?,?,?)",
      [
        theReq.estActif,
        theReq.debut,
        theReq.fin,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}

function countAllFinancementInModel(){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL financements_countAll()",
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
function financementSelectByParamsInModel(theReq){
  return new Promise((resolve,reject)=> {

      connection.query("CALL financements_selectByParams(?,?,?,?,?,?)",
            [ 
              theReq.structureId,
              theReq.projetId,
              theReq.typeFinancement,
              theReq.activiteId,
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

module.exports = {
  financementSelectByParamsInModel,
  addFinancementInModel,
  disableFinancementInModel,
  updateFinancementInModel,
  getFinancementByIdInModel,
  getAllFinancementInModel,
  financementSelectByInModel,
  countAllFinancementInModel
}