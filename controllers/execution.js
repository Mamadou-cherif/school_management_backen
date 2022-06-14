const Execution= require("../models/execution")

const initExecutionClass= require("../classes/execution")

  function executionSelectBy(req, res, next){
    const executionObj={
      id: null,
      projetId: req.body.projetId || null,
      date: req.body.date || null ,
      taux: req.body.taux || null,
      observations: req.body.observations || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debut: req.body.debut || null,
      fin: req.body.fin || null
}


    Execution.executionSelectByInModel(executionObj)
    .then(execution=> res.status(200).json(execution))
    .catch(error=> res.status(400).json({error}))
    
  }

  
 
function getAllExecution(req, res, next) {

  Execution.getAllExecutionInModel(req)
    .then(execution => res.status(200).json(execution))
    .catch(error => res.status(400).json(error))
}



function selectByIdExecution(req, res, next) {
  const id = req.params.id
  Execution.executionSelectByIdInModel(id)
    .then(execution => res.status(200).json(execution))
    .catch(error => res.status(400).json(error))
}


function addExecution(req, res, next) {
  // const executionObj = {
  //   valeurCibleId: req.body.valeurCibleId,
  //   estActif: 1
  // }
  //       Execution.executionSelectBy(executionObj)
  //         .then(execution => {
  //           if (execution.length == 0) {
    const executionObj={
      projetId: req.body.projetId,
      date: req.body.date  ,
      taux: req.body.taux ,
      observations: req.body.observations ,
      creationUserId: req.body.creationUserId ,
    
      }
        Execution.addExecutionInModel(executionObj)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée executions_insert" }));
//         }
    // })
    // .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée executions_selectBy" }))
}


function updateExecution(req, res, next) {
  // const executionObj = {
  //   valeurCibleId: req.body.valeurCibleId,
  //   estActif: 1
  // }
  //       Execution.executionSelectBy(executionObj)
  //         .then(execution => {
  //           if (execution.length == 0) {
                const executionObj={
                  id: req.body.id ,
                  projetId: req.body.projetId,
                  date: req.body.date  ,
                  taux: req.body.taux ,
                  observations: req.body.observations,
                  modifDate: req.body.modifDate,
                  modifUserId: req.body.modifUserId
                }

              Execution.updateExecutionInModel(executionObj)
                .then(() => res.status(200).json({ succes: "modification effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée executions_insert" }));
    //         }
    // })
    // .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée executions_selectBy" }))
}



function disableExecution(req, res, next) {

  const objExecution = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Execution.disableExecutionInModel(objExecution)
    .then(() => res.status(200).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}





module.exports={  
  selectByIdExecution,
  getAllExecution,
  addExecution,
  disableExecution,
  updateExecution,
  executionSelectBy
}




 
