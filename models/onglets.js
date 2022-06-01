const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");



function checkIfOngletExists(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL onglets_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.menuId,
        theReq.reference,
        theReq.libelle,
        theReq.descriptions,
        theReq.type,
        theReq.ordre,
        theReq.url,
        theReq.image,
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


function addOngletInModel(theReq) {
  return new Promise((resolve, reject) => {


    connection.query("CALL onglets_insert(?,?,?,?,?,?,?,?,?)",
      [

        theReq.body.menuId,
        theReq.body.reference,
        theReq.body.libelle,
        theReq.body.descriptions,
        theReq.body.typeOnglet,
        theReq.body.ordre,
        theReq.body.url,
        theReq.body.image,
        theReq.body.creationUserId,


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

function getOngletByIdInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL onglets_selectById(?)",
      [
        theReq.params.id
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
function disableOngletInModel(theReq, theResponse) {
  return new Promise((reject, resolve) => {

    connection.query("CALL onglets_disable(?,?,?)",
      [
        theReq.body.id,
        theReq.body.modifUserId,
        theReq.body.modifDate
      ],
      (err, results, fields) => {
        if (err) {
          theResponse.status(400).json({ succes: "La suppression logique a échoué" })
        }
        else {
          theResponse.status(200).json({ succes: "La suppression logique a bien reussie" })
        }
      })
  })
}

function getOngletByGroupeModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL onglets_getOngletByGroupe(?,?)",
      [
        theReq.body.menuId,
        theReq.body.groupeId
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

function getOngletByUserReferenceMenuInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL onglets_getOngletByUserReferenceMenu(?,?)",
      [
        theReq.userId,
        theReq.referenceMenu
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


function getAffectesByGroupeAndMenuInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL onglets_getAffectesByGroupeAndMenu(?,?)",
      [
        theReq.body.groupeId,
        theReq.body.menuId
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




function getOngletsAffecteAUnGroupeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_getOngletsAffecteAUnGroupe(?)",
      [

        theReq.body.groupeId,

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

function updateOngletInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL onglets_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.body.id,
        theReq.body.menuId,
        theReq.body.reference,
        theReq.body.libelle,
        theReq.body.descriptions,
        theReq.body.typeOnglet,
        theReq.body.ordre,
        theReq.body.url,
        theReq.body.image,
        theReq.body.modifDate,
        theReq.body.modifUserId
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




// function updateOngletInModel(theReq){
//   return new Promise((resolve, reject)=>{

//           connection.query("CALL onglets_update(?,?,?,?,?,?,?,?,?,?,?)", 
//                       [
//                         theReq.body.id,
//                         theReq.body.menuId,
//                         theReq.body.reference,
//                         theReq.body.libelle,
//                         theReq.body.descriptions,
//                         theReq.body.type,
//                         theReq.body.ordre,
//                         theReq.body.url,
//                         theReq.body.image,
//                         theReq.body.modifDate,
//                         theReq.body.modifUserId
//                       ]
//                   ,
//                          ((err,results, fields)=>{
//                                 if(err){
//                                   reject(err)
//                                 }
//                                 resolve(results[0])
//                               })
//      )

//     })

// }

module.exports = {
  checkIfOngletExists,
  addOngletInModel,
  disableOngletInModel,
  getOngletByGroupeModel,
  getAffectesByGroupeAndMenuInModel,
  getOngletsAffecteAUnGroupeInModel,
  getOngletByIdInModel,
  updateOngletInModel,
  getOngletByUserReferenceMenuInModel,
}