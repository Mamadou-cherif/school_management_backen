const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")


function getAllCouleurInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL couleurs_selectAll(?,?,?)",
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



function getCouleurByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL couleurs_selectById(?)",
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


function addCouleurInModel(data) {

  return new Promise((resolve, reject) => {
    connection.query("CALL couleurs_insert(?,?,?)",
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
        else {
          resolve(results);
        }

      })
    )
  })
}

function updateCouleurInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL couleurs_update(?,?,?,?,?)",
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
          resolve(results[0]);
        }

      })
    )
  })
}
function couleurSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL couleurs_selectBy(?,?,?,?,?,?,?,?,?,?)",
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
        } else {
          resolve(results[0])
        }

      })
    )
  })
}

function disableCouleurInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL couleurs_disable(?)",
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

function deleteCouleurInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL couleurs_delete(?)",
      [
        id,

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

module.exports = {
  getAllCouleurInModel,
  getCouleurByIdInModel,
  addCouleurInModel,
  updateCouleurInModel,
  disableCouleurInModel,
  couleurSelectByInModel,
  deleteCouleurInModel
}