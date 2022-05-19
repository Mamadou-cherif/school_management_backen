const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function getAllRubriqueInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL rubriques_selectAll(?,?,?)",
      [
        1,
        null,
        null
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



function getRubriqueByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL rubriques_selectById(?)",
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


function addRubriquesInModel(data) {

  return new Promise((resolve, reject) => {
    connection.query("CALL rubriques_insert(?,?,?)",
      [
        data.libelle,
        data.code,
        data.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        resolve(results);
      })
    )
  })
}

function updateRubriquesInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL rubriques_update(?,?,?,?,?,?)",
      [
        data.id,
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
function rubriquesSelectByInModel(data) {
  return new Promise((resolve, reject) => {

    connection.query("CALL rubrques_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.libelle,
        data.code,
        data.estActif,
        data.creationDate,
        data.creationUserId,
        data.modifDate,
        data.modifUserId,
        data.debutDonnees,
        data.finDonnees,
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

function deleteRubriquesInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL rubriques_delete(?)",
      [
        id,
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

module.exports = {
  getAllRubriqueInModel,
  getRubriqueByIdInModel,
  addRubriquesInModel,
  updateRubriquesInModel,
  deleteRubriquesInModel,
  rubriquesSelectByInModel
}