const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function getCountPrivilegeForActionOnglet(theReq) {
  return new Promise((resolve, reject) => {


    connection.query("CALL privileges_getCountPrivilegeForActionOnglet(?,?,?)",
      [
        theReq.userId,
        theReq.referenceMenu,
        theReq.referenceOnglet,
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

function getCountPrivilegeForActionMenu(theReq) {
  return new Promise((resolve, reject) => {


    connection.query("CALL privileges_getCountPrivilegeForActionMenu(?,?,?)",
      [
        theReq.userId,
        theReq.referenceMenu,
        theReq.modeAccesId,
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

function checkIfPrivilegeExists(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL privileges_selectBy(?,? ,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.menuId,
        theReq.ongletId,
        theReq.groupeId,
        theReq.modeAccesId,
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

function getAllPrivilegesInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL privileges_selectAll(?,?,?)",
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

function addPrivilegeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL privileges_insert(?,?,?,?,?)",
      [
        theReq.body.menuId,
        theReq.body.ongletId,
        theReq.body.groupeId,
        theReq.body.modeAccesId,
        theReq.body.creationUserId
      ]
      ,
      (err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results);
        }
        // connection.end()

      })

  })

}

function deletePrivilegeInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL privileges_delete(?)",
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



//supression en logique d'un utilisateur
function disablePrivilegeInModel(theReq, theResponse) {
  return new Promise((reject, resolve) => {

    connection.query("CALL privileges_disable(?,?,?)",
      [
        theReq.body.id,
        theReq.body.modifUserId,
        theReq.body.modifDate
      ],
      (err, results, fields) => {
        if (err) {
          theResponse.status(400).json({ error: "La suppression logique a échoué" })
        }
        else {
          theResponse.status(200).json({ succes: "La suppression logique a bien reussie" })
        }
      })
  })
}


module.exports = {
  getAllPrivilegesInModel,
  checkIfPrivilegeExists,
  addPrivilegeInModel,
  disablePrivilegeInModel,
  deletePrivilegeInModel,
  getCountPrivilegeForActionOnglet,
  getCountPrivilegeForActionMenu

}