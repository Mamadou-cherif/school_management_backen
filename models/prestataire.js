const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function prestataireSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL prestataires_selectBy(?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?)",
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


  function getAllPrestataireInModel(theReq){
    return new Promise((resolve,reject)=> {
      
      connection.query("CALL prestataires_selectAll(?,?,?)",
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
    getAllPrestataireInModel,
    prestataireSelectByInModel
  }