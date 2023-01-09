const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectTacheNotAffectedPlannifActivite(theReq){
   return new Promise((resolve, reject) => {

    connection.query("CALL plannifactivites_selectTacheNotAffectedPlannifActivite(?,?)",
      [
        theReq.activiteId,
        theReq.templateId
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

function plannifactiviteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL plannifactivites_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.tacheId,
        theReq.duree,
        theReq.debut,
        theReq.fin,
        theReq.userId,
        theReq.tachePrecedenteId,
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


function disablePlannifActiviteInModel(theReq){
  return new Promise((resolve,reject)=> {
  
      connection.query("CALL plannifactivites_disable(?,?,?)",
            [ 
              theReq.id,
              theReq.modifUserId,
              theReq.modifDate
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

function getAllPlannifActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL plannifactivites_selectAll(?,?,?)",
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



function plannifactiviteSelectByIdInModel(id){
  return new Promise((resolve,reject)=> {

    connection.query("CALL plannifactivites_selectById(?)",
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


function addPlannifActiviteInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL plannifactivites_insert(?,?,?,?,?,?,?,?,?)",
          [
            theReq.activiteId,
            theReq.tacheId,
            theReq.duree,
            theReq.debut,
            theReq.fin,
            theReq.userId,
            theReq.tachePrecedenteId,
            theReq.observations,
            theReq.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
          //connection.end();
        }
        else{
        resolve(results[0]);
        }

      })
    )
  })
}

function addSinglePlannifActiviteInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL plannifactivites_insert(?,?,?,?,?,?,?,?,?)",
          [
            theReq.activiteId,
            theReq.tacheId,
            theReq.duree,
            theReq.debut,
            theReq.fin,
            theReq.userId,
            theReq.tachePrecedenteId,
            theReq.observations,
            theReq.creationUserId,
          ],

      ((err,results, fields)=>{
        if(err){
          console.log(err)
          reject(err)
          //connection.end();
        }
        else{
        resolve(results[0]);
        }

      })
    )
  })
}


function updatePlannifActiviteInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL plannifactivites_update(?,?,?,?,?,?,?,?,?,?,?)",
          [
            theReq.id, 
            theReq.activiteId,
            theReq.tacheId,
            theReq.duree,
            theReq.debut,
            theReq.fin,
            theReq.userId,
            theReq.tachePrecedenteId,
            theReq.observations,
            theReq.modifDate,
            theReq.modifUserId,
          ],

      ((err,results, fields)=>{
        if(err){   
          console.log(err)
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

function deleteAndUpdateInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL plannifactivites_deleteAndUpdate(?,?,?,?,?)",
          [ 
            theReq.id,
            theReq.tacheId,
            theReq.tachePrecedenteId,
            theReq.activiteId,
            theReq.modifUserId
          ],

      ((err,results, fields)=>{
        if(err){
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

function deletePlannifActiviteInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL plannifactivites_delete(?)",
          [ 
            id
          ],

      ((err,results, fields)=>{
        if(err){
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
  deleteAndUpdateInModel,
  addSinglePlannifActiviteInModel,
  selectTacheNotAffectedPlannifActivite,
  getAllPlannifActiviteInModel,
  updatePlannifActiviteInModel,
  addPlannifActiviteInModel,
  plannifactiviteSelectByIdInModel,
  disablePlannifActiviteInModel,
  plannifactiviteSelectByInModel,
  deletePlannifActiviteInModel
}