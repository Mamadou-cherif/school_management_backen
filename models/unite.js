const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")

function checkIfUniteExists(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL unites_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.symbole,
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
        else{
          resolve(results[0])
        }
      })
    )
  })
}

function selectByIdUniteInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL unites_selectById(?)",
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

function selectAllUniteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL unites_selectAll(?,?,?)",
      [
        1,
        null,
        null
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

function addUniteInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL unites_insert(?,?,?)",
      [
        data.libelle,
        data.symbole,
        data.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results);
        }

      })
    )
  })
}

function updateUniteInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL unites_update(?,?,?,?,?)",
      [
        data.id,
        data.libelle,
        data.symbole,
        data.modifDate,
        data.modifUserId,
      ],

      ((err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results);
        }

      })
    )
  })
}
function deleteUniteInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL unites_delete(?)",
      [
        id,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(results[0]);
        }

      })
    )
  })
}
function uniteSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL unites_selectBy(? ,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.libelle,
        data.symbole,
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
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}




module.exports = {
  checkIfUniteExists,
  uniteSelectByInModel,
  addUniteInModel,
  updateUniteInModel,
  selectByIdUniteInModel,
  selectAllUniteInModel,
  deleteUniteInModel
}