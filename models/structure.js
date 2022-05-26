const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function structureSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL structures_selectBy(?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
             data.categorieId,
             data.categorie,
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


  function getAllStructureInModel(theReq){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL structures_selectAll(?,?,?)",
            [ 
              1,
              null,
              null
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
    structureSelectByInModel,
    getAllStructureInModel
  }