const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function selectByIdCommuneInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL communes_selectById(?)",
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

function selectAllCommuneInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL communes_selectAll(?,?,?)",
      [
        theReq.body.estActif,
        theReq.body.debut,
        theReq.body.fin
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

function addCommuneInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL communes_insert(?,?,?,?)",
      [
        data.prefectureId,
        data.libelle,
        data.code,
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

function updateCommuneInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL communes_update(?,?,?,?,?,?)",
      [
        data.id,
        data.prefectureId,
        data.libelle,
        data.code,
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
function deleteCommuneInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL communes_delete(?)",
      [
        id,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }else{
          resolve(results[0])
        }
      })
    )
  })
}
function communeSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL communes_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.prefectureId,
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
  communeSelectByInModel,
  addCommuneInModel,
  updateCommuneInModel,
  selectByIdCommuneInModel,
  selectAllCommuneInModel,
  deleteCommuneInModel
}