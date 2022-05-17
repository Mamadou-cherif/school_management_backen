const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function selectByIdDeviseInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL devises_selectById(?)",
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

function selectAllDeviseInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL devises_selectAll(?,?,?)",
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

function addDeviseInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL devises_insert(?,?,?)",
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

function updateDeviseInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL devises_update(?,?,?,?,?)",
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
function deleteDeviseInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL devises_delete(?)",
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
function communeSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL devises_selectBy(? ,?,?,?,?,?,?,?,?,?)",
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
  communeSelectByInModel,
  addDeviseInModel,
  updateDeviseInModel,
  selectByIdDeviseInModel,
  selectAllDeviseInModel,
  deleteDeviseInModel
}