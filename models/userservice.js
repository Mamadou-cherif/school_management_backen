const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");


function addUserServiceInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_insert(?,?,?,?,?)",
      [
        theReq.userId,
        theReq.serviceId,
        theReq.debut,
        theReq.fin,
        theReq.creationUserId


      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results[0])
        }

      })
    )
  })
}

function UserServiceSelectByInModel(theReq) {
  console.log(theReq)
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.userId,
        theReq.serviceId,
        theReq.debut,
        theReq.fin,
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
          console.log(err)
          reject(err)
        }
        else{
          resolve(results[0])
        }
        
      })
    )
  })
}



function selectNotAffecteUserServiceIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_selectNotAffecteUserServiceId(?)",
      [
        theReq.userId
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

function getUserServiceByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_selectById(?)",
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


function disableUserServiceInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_disable(?,?,?)",
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


function updateUserServiceInModel(theReq) {
  console.log(theReq)
  return new Promise((resolve, reject) => {
    connection.query("CALL userservices_update(?,?,?,?,?,?,?)",
      [
  
        theReq.id,
        theReq.userId,
        theReq.serviceId,
        theReq.debut,
        theReq.fin,
        theReq.modifDate,
        theReq.modifUserId
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

function getAllUserServiceInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL userservices_selectAll(?,?,?)",
      [
        1,
        null,
        null,

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
  addUserServiceInModel,
  selectNotAffecteUserServiceIdInModel,
  disableUserServiceInModel,
  updateUserServiceInModel,
  getUserServiceByIdInModel,
  getAllUserServiceInModel,
  UserServiceSelectByInModel
}