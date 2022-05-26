const Intervention= require("../models/execution")

const initInterventionClass= require("../classes/execution")

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


    Intervention.executionSelectByInModel(executionObj)
    .then(execution=> res.status(200).json(execution))
    .catch(error=> res.status(400).json({error}))
    
  }

  
     
function addExecution(req, res,next){
}





//supression en dur
function deleteExecution(req, res, next){
    
}

//supression logique d'un utilisateur
function disableExecution(req, res, next){
}



function updateExecution(req,res, next){
    
 
}

function getAsingleExecution(req, res, next){

}




module.exports={  
  disableExecution,
  deleteExecution,
  addExecution,
  updateExecution,
  getAsingleExecution,
  executionSelectBy
}




 
