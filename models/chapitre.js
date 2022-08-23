const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");





function chapitreSelectByInModel(theReq) {
  console.log(theReq)
  return new Promise((resolve, reject) => {

    connection.query("CALL chapitresprogles_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prograGleId,
		    theReq.numero,
		    theReq.libelle,
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



function disableChapitreInModel(theReq){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL chapitresprogles_disable(?,?,?)",
            [ 
              theReq.id,
              theReq.modifUserId,
              theReq.modifDate,
              
            ],
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }
          resolve(results[0])
        })
      )
    })
}

function getAllChapitreInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL chapitresprogles_selectAll(?,?,?)",
      [
        1,
        null,
        null
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



function chapitreSelectByIdInModel(id){
  return new Promise((resolve,reject)=> {

    connection.query("CALL chapitresprogles_selectById(?)",
          [ 
            id
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function addChapitreInModel(theReq){
  console.log(theReq)
  return new Promise((resolve,reject)=> {
    connection.query("CALL chapitresprogles_insert(?,?,?,?,?)",
          [
            theReq.prograGleId,
	          theReq.numero,
		        theReq.libelle,
            theReq.observations,
            theReq.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
          //connection.end();
        }
        else{
        resolve(results);
        }

      })
    )
  })
}




function updateChapitreInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL chapitresprogles_update(?,?,?,?,?,?,?)",
          [
            theReq.id, 
            theReq.prograGleId,
	        theReq.numero,
		    theReq.libelle,
            theReq.observations,
            theReq.modifDate,
            theReq.modifUserId,
          ],

      ((err,results, fields)=>{
        if(err){   

          reject(err)
          //connection.end();
        }
        else{
        resolve(results);
        }

      })
    )
  })
}


module.exports = {
  getAllChapitreInModel,
  updateChapitreInModel,
  addChapitreInModel,
  chapitreSelectByIdInModel,
  disableChapitreInModel,
  chapitreSelectByInModel
}