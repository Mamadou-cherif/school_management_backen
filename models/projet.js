const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function addProjetInModel(theReq) {

  return new Promise((resolve, reject) => {

    connection.query("CALL projets_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.programmeId,
        theReq.code,
        theReq.titre,
        theReq.description,
        theReq.prioriteId,
        theReq.nature,
        theReq.modalites,
        theReq.objectif,
        theReq.duree,
        theReq.debut,
        theReq.fin,
        theReq.statutId,
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

function projetSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projets_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.programmeId,
        theReq.code,
        theReq.titre,
        theReq.description,
        theReq.prioriteId,
        theReq.nature,
        theReq.modalites,
        theReq.objectif,
        theReq.duree,
        theReq.debut,
        theReq.fin,
        theReq.statutId,
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

function selectByIdProjetInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projets_selectById(?)",
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

function getStatutByProgrammeIdOrAxeId(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL projets_getStatutByProgrammeIdOrAxeId(?,?)",
      [
        theReq.programmeId,
        theReq.axeId
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

function disableProjetInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projets_disable(?,?,?)",
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


function updateProjetInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projets_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.programmeId,
        theReq.code,
        theReq.titre,
        theReq.description,
        theReq.prioriteId,
        theReq.nature,
        theReq.modalites,
        theReq.objectif,
        theReq.duree,
        theReq.debut,
        theReq.fin,
        theReq.statutId,
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

function selectAllProjetInModel(theReq) {

  return new Promise((resolve, reject) => {

    connection.query("CALL projets_selectAll(?,?,?)",
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
  addProjetInModel,
  disableProjetInModel,
  updateProjetInModel,
  selectByIdProjetInModel,
  selectAllProjetInModel,
  projetSelectByInModel,
  getStatutByProgrammeIdOrAxeId
}