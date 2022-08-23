const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addProgrammeglesInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_insert(?,?,?,?,?,?)",
      [
        theReq.libelle,
        theReq.sigle,
        theReq.debut,
        theReq.fin,
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

function programmeglesSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.sigle,
        theReq.debut,
        theReq.fin,
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
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}

function getProgrammeglesByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_selectById(?)",
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


function disableProgrammeglesInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_disable(?,?,?)",
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


function updateProgrammeglesInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.sigle,
        theReq.debut,
        theReq.fin,
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

function getAllProgrammeglesInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL programmegles_selectAll(?,?,?)",
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
  addProgrammeglesInModel,
  disableProgrammeglesInModel,
  updateProgrammeglesInModel,
  getProgrammeglesByIdInModel,
  getAllProgrammeglesInModel,
  programmeglesSelectByInModel
}