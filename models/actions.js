const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_insert(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.projetId,
        theReq.categorieActionId,
        theReq.libelle,
        theReq.typeExpertiseId,
        theReq.charge,
        theReq.uniteId,
        theReq.delai,
        theReq.unite2Id,
        theReq.cout,
        theReq.deviseId,
        theReq.observations,
        theReq.creationUserId


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

function actionsSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.categorieActionId,
        theReq.libelle,
        theReq.typeExpertiseId,
        theReq.charge,
        theReq.uniteId,
        theReq.delai,
        theReq.unite2Id,
        theReq.cout,
        theReq.deviseId,
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

function getActionByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_selectById(?)",
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


function disableActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_disable(?,?,?)",
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


function updateActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.categorieActionId,
        theReq.libelle,
        theReq.typeExpertiseId,
        theReq.charge,
        theReq.uniteId,
        theReq.delai,
        theReq.unite2Id,
        theReq.cout,
        theReq.deviseId,
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

function getAllActionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL actions_selectAll(?,?,?)",
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

module.exports = {
  addActionInModel,
  disableActionInModel,
  updateActionInModel,
  getActionByIdInModel,
  getAllActionInModel,
  actionsSelectByInModel
}