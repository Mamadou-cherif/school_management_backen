const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addPgprioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_insert(?,?,?,?,?,?)",
      [
        theReq.prograGleId,
        theReq.numero,
        theReq.libelle,
        theReq.copie,
        theReq.observations,
        theReq.creationUserId


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

function programmesprioritairesSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prograGleId,
        theReq.numero,
        theReq.libelle,
        theReq.copie,
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

function getPgprioritaireByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_selectById(?)",
      [
        id

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


function disablePgprioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_disable(?,?,?)",
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


function updatePgprioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prograGleId,
        theReq.numero,
        theReq.libelle,
        theReq.copie,
        theReq.observations,
        theReq.modifDate,
        theReq.modifUserId

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

function getAllPgprioritaireInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmesprioritaires_selectAll(?,?,?)",
      [
        1,
        null,
        null,

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

module.exports = {
  addPgprioritaireInModel,
  disablePgprioritaireInModel,
  updatePgprioritaireInModel,
  getPgprioritaireByIdInModel,
  getAllPgprioritaireInModel,
  programmesprioritairesSelectByInModel
}