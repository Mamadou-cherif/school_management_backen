const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addPapbInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_insert(?,?,?,?,?,?)",
      [
        theReq.proGleId,
        theReq.libelle,
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

function papbsSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.proGleId,
        theReq.libelle,
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

function getPapbByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_selectById(?)",
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


function disablePapbInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_disable(?,?,?)",
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


function updatePapbInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.proGleId,
        theReq.libelle,
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

function getAllPapbInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL papluriannuelbs_selectAll(?,?,?)",
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
  addPapbInModel,
  disablePapbInModel,
  updatePapbInModel,
  getPapbByIdInModel,
  getAllPapbInModel,
  papbsSelectByInModel
}