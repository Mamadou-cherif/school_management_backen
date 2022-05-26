const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();


function structureSelectByInModel(data) {

  return new Promise((resolve, reject) => {
    connection.query("CALL structures_selectBy(?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.categorieId,
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.header,
        data.footer,
        data.observations,
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
        } else {
          resolve(results[0])
        }

      })
    )
  })
}


function getAllStructureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL structures_selectAll(?,?,?)",
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

function getAllCategorieStructureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL categoriestructures_selectAll(?,?,?)",
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




function updateStructureInModel(data) {
  return new Promise((resolve, reject) => {

    connection.query("CALL structures_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.categorieId,
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.header,
        data.footer,
        data.observations,
        data.modifUserId,
        data.modifDate



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


function addStructureInModel(data) {
  console.log('data', data)
  return new Promise((resolve, reject) => {
    connection.query("CALL structures_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.categorieId,
        data.nom,
        data.sigle,
        data.logo,
        data.website,
        data.telephone1,
        data.telephone2,
        data.email,
        data.adresse,
        data.localiteId,
        data.header,
        data.footer,
        data.observations,
        data.creationUserId




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


function disableStrcutureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL structures_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

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

function getStructureByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL structures_selectById(?)",
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

module.exports = {

  getAllStructureInModel,
  disableStrcutureInModel,
  updateStructureInModel,
  addStructureInModel,
  structureSelectByInModel,
  getStructureByIdInModel,
  getAllCategorieStructureInModel
}