const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function prefectureSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prefectures_selectBy(?,? ,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.regionId,
        data.libelle,
        data.code,
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
        }
        resolve(results[0])
      })
    )
  })
}


function selectByIdPrefectureInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prefectures_selectById(?)",
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

function selectAllPrefectureInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prefectures_selectAll(?,?,?)",
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

function addPrefectureInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prefectures_insert(?,?,?,?)",
      [
        data.regionId,
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

function updatePrefectureInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prefectures_update(?,?,?,?,?,?)",
      [
        data.id,
        data.regionId,
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
  function deletePrefectureInModel(id){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL prefectures_delete(?)",
            [ 
              id,
              
            ],
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }
          else{
            resolve(results[0])

          }
        })
      )
    })
  }
 
  module.exports={
    prefectureSelectByInModel,
    addPrefectureInModel,
    updatePrefectureInModel,
    selectByIdPrefectureInModel,
    selectAllPrefectureInModel,
    deletePrefectureInModel
  }
 
