const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();



function addCategorieActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_insert(?,?,?)",
      [
        theReq.libelle,
        theReq.code,
        theReq.creationUserId,

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

function checkIfCategorieActionExists(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.code,
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

function getCategorieActionByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_selectById(?)",
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


function disableCategorieActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_disable(?,?,?)",
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


function updateCategorieActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_update(?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.code,
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

function getAllCategorieActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_selectAll(?,?,?)",
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


function deleteCategorieActionInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categorieactions_delete(?)",
      [
        id,

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
  deleteCategorieActionInModel,
  addCategorieActionInModel,
  disableCategorieActionInModel,
  updateCategorieActionInModel,
  getCategorieActionByIdInModel,
  getAllCategorieActionInModel,
  checkIfCategorieActionExists
}