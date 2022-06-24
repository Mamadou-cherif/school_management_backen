const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")


function prestataireSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prestataires_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.type,
        data.categorie,
        data.localisation,
        data.nom,
        data.sigle,
        data.telephone,
        data.email,
        data.adresse,
        data.localiteId,
        data.partenaireLocalId,
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

function addPrestataireInModel(data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    connection.query("CALL prestataires_insert(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.type,
        data.categorie,
        data.localisation,
        data.nom,
        data.sigle,
        data.telephone,
        data.email,
        data.adresse,
        data.localiteId,
        data.partenaireLocalId,
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


function getAllPrestataireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestataires_selectAll(?,?,?)",
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


function updatePrestataireInModel(data) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestataires_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.type,
        data.categorie,
        data.localisation,
        data.nom,
        data.sigle,
        data.telephone,
        data.email,
        data.adresse,
        data.localiteId,
        data.partenaireLocalId,
        data.observations,
        data.modifDate,
        data.modifUserId

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


function disablePrestataireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestataires_disable(?,?,?)",
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




function getPrestataireByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestataires_selectById(?)",
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



function countAllPrestataireInModel(){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL prestataires_countAll()",
            [],
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }
          resolve(results[0])
        })
      )
    })
}


module.exports = {
  getAllPrestataireInModel,
  countAllPrestataireInModel,
  prestataireSelectByInModel,
  disablePrestataireInModel,
  updatePrestataireInModel,
  addPrestataireInModel,
  getPrestataireByIdInModel
}