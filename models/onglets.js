const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 

function checkIfOngletExists(theReq){
  return new Promise((resolve,reject)=> {
      
    connection.query("CALL onglets_selectBy(? ,?,?,?,?,?,?,?,?)",
          [
           theReq.body.menuId,
           theReq.body.reference,
           theReq.body.libelle,
           theReq.body.descriptions,
           theReq.body.type,
           theReq.body.ordre,
           theReq.body.url,
           theReq.body.image,
           theReq.body.creationUserId,
           
 
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


function addOngletInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL onglets_insert(?,?,?)", 
                      [
                        theReq.body.libelle,
                        theReq.body.prestataireId,
                        theReq.body.creationUserId,
                      
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                      reject(err)
                      //connection.end();
                    }
                    else{
                    resolve(results);}
                    // connection.end()
            
          })
   
    })
  
}

//supression en logique d'un utilisateur
function disableOngletInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL onglets_disable(?,?,?)",
     [  
         theReq.body.id,
         theReq.body.modifUserId,
         theReq.body.modifDate
      ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({succes: "La suppression logique a échoué"})
        }
        else{
          theResponse.status(200).json({succes: "La suppression logique a bien reussie"})
        }
      })
  })
}


module.exports= {
    checkIfOngletExists,
    addOngletInModel,
    disableOngletInModel,

}