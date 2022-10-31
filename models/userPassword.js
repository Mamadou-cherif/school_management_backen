const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function userPasswordSelectByInModel(theReq){
    return new Promise((resolve,reject)=> {
      connection.query("CALL userpasswords_selectBy(?, ?,?, ?, ?, ?, ?, ?,?, ?)",
            [
                    theReq.id,
                    theReq.userId,
                    theReq.type,
                    theReq.estActif,
                    theReq.creationDate,
                    theReq.creationUserId,
                    theReq.modifDate,
                    theReq.modifUserId,
                    theReq.debutDonnees,
                    theReq.finDonnees
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

  function userPasswordInsertInModel(theReq){
    return new Promise((reject, resolve)=>{
      connection.query("CALL userpasswords_insert(?,?,?)",
       [  
           theReq.userId,
           theReq.type,
           theReq.creationUserId
           
        ],
        (err, results, fields)=>{
          if(err){
            reject(err)
          }
          else{
            resolve(results[0])
          }
        }) 
    })
  }

  module.exports={
    userPasswordSelectByInModel,
    userPasswordInsertInModel    
  }