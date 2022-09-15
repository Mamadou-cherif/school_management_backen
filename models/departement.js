const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();

function departementSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL departements_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.observations,
        data.estActif,
        data.creationDate,
        data.creationUserId,
        data.modifDate,
        data.modifUserId,
        data.debutDonnees,
        data.finDonnees
      ],

      ((err, results, fields) => {

        if (err) {
            console.log(err)
          reject(err)
        } else {
          resolve(results[0])
        }

      })
    )
  })
}




function getAllDepartementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL departements_selectAll(?,?,?)",
      [
        1,
        null,
        null
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




function updateDepartementInModel(data) {
  return new Promise((resolve, reject) => {

    connection.query("CALL departements_update(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.observations,
        data.modifUserId,
        data.modifDate



      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }

      })
    )
  })
}


function addDepartementInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL departements_insert(?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.observations,
        data.creationUserId
      ],
      ((err, results, fields) => {

        if (err) {
          reject(err)
        }
        else {
          resolve(results[0])
        }
      })
    )
  })
}


function disableDepartementInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL departements_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }

      })
    )
  })
}

function getDepartementByIdInModel(id) {
  return new Promise((resolve, reject) => {
  
    connection.query("CALL departements_selectById(?)",
      [
        id
      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else{
          resolve(results[0])
        }
      })
    )
  })
}

function countAllDepartementInModel(){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL departements_countAll()",
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
module.exports = {
  countAllDepartementInModel,
  disableDepartementInModel,
  updateDepartementInModel,
  addDepartementInModel,
  departementSelectByInModel,
  getDepartementByIdInModel,
  getAllDepartementInModel
}
