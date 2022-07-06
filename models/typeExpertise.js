const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)

function selectByIdTypeExpertiseInModel(id){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typeexpertises_selectById(?)",
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

function selectAllTypeExpertiseInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typeexpertises_selectAll(?,?,?)",
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

function addTypeExpertiseInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typeexpertises_insert(?,?,?)",
          [
           data.libelle,
           data.code,
           data.creationUserId,
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

function updateTypeExpertiseInModel(data){
  return new Promise((resolve,reject)=> {
    connection.query("CALL typeexpertises_update(?,?,?,?,?)",
          [
            data.id, 
            data.libelle,
            data.code,
            data.modifDate,
            data.modifUserId,
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
function deleteTypeExpertiseInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL typeexpertises_delete(?)",
          [ 
            id,
            
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }else{
           resolve(results[0])
        }
       
      })
    )
  })
}
function typeExpertiseSelectByInModel(data){
    return new Promise((resolve,reject)=> {
      connection.query("CALL typeexpertises_selectBy(? ,?,?,?,?,?,?,?,?,?)",
            [
             data.id,
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
    typeExpertiseSelectByInModel,
    addTypeExpertiseInModel,
    updateTypeExpertiseInModel,
    selectByIdTypeExpertiseInModel,
    selectAllTypeExpertiseInModel,
    deleteTypeExpertiseInModel
  }