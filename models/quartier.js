const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function quartierSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL quartierdistricts_selectBy(?,? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
             data.communeId,
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
  
        ((err,results, fields)=>{
          if(err){
            reject(err)
          }
          resolve(results[0])
        })
      )
    })
  }


 
  module.exports={
    quartierSelectByInModel
  }