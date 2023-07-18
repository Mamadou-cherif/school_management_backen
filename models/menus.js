const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");



function addAMenu(theObject) {

  return new Promise((resolve, reject) => {
    connection.query("CALL menus_insert(?,?,?,?,?,?,?,?,?)",
      [
        theObject.reference,
        theObject.libelle,
        theObject.descriptions,
        theObject.url,
        theObject.menuPereId,
        theObject.ordre,
        theObject.typeMenu,
        theObject.image,
        theObject.creationUserId,
      ]
      ,
      (err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results[0]);
          // connection.end()
        }


      })
  })


}


function checkIfMenuExists(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.reference,
        theReq.libelle,
        theReq.descriptions,
        theReq.url,
        theReq.menuPereId,
        theReq.ordre,
        theReq.typeMenu,
        theReq.image,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
        theReq.modifDate,
        theReq.modifUserId
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


function getMenuPereInModel() {
  return new Promise((resolve, reject) => {


    connection.query("CALL menus_getMenuPere()",
      [

      ]
      ,
      (err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results[0]);
        }
        // connection.end()

      })

  })

}

function getMenuFilsInModel() {
  return new Promise((resolve, reject) => {


    connection.query("CALL menus_getMenuFils()",
      [

      ]
      ,
      (err, results, fields) => {
        if (err) {

          reject(err)
          //connection.end();
        }
        else {
          resolve(results[0]);
        }
        // connection.end()

      })

  })

}


//supression en logique d'un utilisateur
function disableMenuInModel(theReq, theResponse) {
  return new Promise((reject, resolve) => {

    connection.query("CALL menus_disable(?,?,?)",
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






function getWithOngletsInModels(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_getWithOnglets(?)",
      [
        theReq.body.typeMenu
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

function getMenuFilsByGroupeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_getMenuFilsByGroupe(?,?)",
      [
        theReq.body.menuPereId,
        theReq.body.groupeId
      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }else{
          resolve(results[0])
        }
        
      })
    )
  })
}
function getAllMenusInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_selectAll(?,?,?)",
      [
        1,
        null,
        null
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

function menus_getMenuPrincipalByUser(theReq) {
  return new Promise((reject, resolve) => {
    connection.query("CALL menus_getMenuPrincipalByUser(?)",
      [
        theReq.userId
      ],
      (err, results, fields) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(results[0])
        }
      })
  })
}

function menus_getMenuPrincipalByUser(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_getMenuPrincipalByUser(?)",
      [
        theReq.userId
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

function menus_getMenuFilsByUserReference(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_getMenuFilsByUserReference(?,?)",
      [
        theReq.userId,
        theReq.referenceMenu
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


function updatatMenuInModel(objMenu) {
  return new Promise((resolve, reject) => {

    connection.query("CALL menus_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        objMenu.id,
        objMenu.reference,
        objMenu.libelle,
        objMenu.descriptions,
        objMenu.url,
        objMenu.menuPereId,
        objMenu.ordre,
        objMenu.typeMenu,
        objMenu.image,
        objMenu.modifDate,
        objMenu.modifUserId
      ]
      ,
      (err, results, fields) => {
        if (err) {

          reject(err)
        }
        resolve(results)

      })

  })

}

function getAsingleMenuInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL menus_selectById(?)",
      [
        theReq.params.id
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

function getFilsByPereInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL menus_getFilsByPere(?)",
      [
        theReq.body.pereId
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

module.exports = {
  getWithOngletsInModels,
  checkIfMenuExists,
  disableMenuInModel,
  getMenuPereInModel,
  getMenuFilsByGroupeInModel,
  getAllMenusInModel,
  menus_getMenuPrincipalByUser,
  updatatMenuInModel,
  menus_getMenuFilsByUserReference,
  getMenuFilsInModel,
  addAMenu,
  getAsingleMenuInModel,
  getFilsByPereInModel

}