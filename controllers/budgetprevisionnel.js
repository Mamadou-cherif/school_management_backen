const BudgetPrevisionnel= require("../models/budgetprevisionnel")
const express= require("express") 


  function budgetPrevisionnellectBy(req, res, next){

    const budgetprevisionnelObj={
      id: req.body.id || null,
      projetId: req.body.projetId || null,
      anneeCibleId: req.body.anneeCibleId || null,
      montant: req.body.montant || null,
      deviseId: req.body.deviseId || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debut: req.body.debut || null, 
      fin: req.body.fin || null
 } 
    BudgetPrevisionnel.budgetPrevisionnelSelectByInModel(budgetprevisionnelObj)
    .then(budgetprevisionnel=> res.status(200).json(budgetprevisionnel))
    .catch(error=> res.status(400).json({error}))
    
  } 

     
function addBudgetPrevisionnel(req, res,next){
  const budgetprevisionnelObj={
    id: req.body.id || null,
    projetId: req.body.projetId || null,
    anneeCibleId: req.body.anneeCibleId || null,
    montant: req.body.montant || null,
    deviseId: req.body.deviseId || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null, 
    fin: req.body.fin || null
}
BudgetPrevisionnel.addBudgetPrevisionnelInModel(budgetprevisionnelObj)
  .then(()=> res.status(200).json({succes: "L'adjout du budget prévisionnel a réussi!"}))
  .catch(()=> res.status(400).json({error: "Echec de l'ajout!"}))
}





//supression en dur
function deleteBudgetPrevisionnel(req, res, next){
    
}

//supression logique d'un utilisateur
function disableBudgetPrevisionnel(req, res, next){
  
    const budgetprevisionnelObj={
      id: req.body.id || null,
      projetId: req.body.projetId || null,
      anneeCibleId: req.body.anneeCibleId || null,
      montant: req.body.montant || null,
      deviseId: req.body.deviseId || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debut: req.body.debut || null, 
      fin: req.body.fin || null
  }
  console.log(budgetprevisionnelObj)
    BudgetPrevisionnel.disableBudgetPrevisionnelInModel(budgetprevisionnelObj)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "le disable n'a pas marché!"}));

}



function updateBudgetPrevisionnel(req,res, next){
  const budgetprevisionnelObj={
    id: req.body.id,
    projetId: req.body.projetId,
    anneeCibleId: req.body.anneeCibleId,
    montant: req.body.montant,
    deviseId: req.body.deviseId,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId,
}
BudgetPrevisionnel.updateBudgetPrevisionnelInModel(budgetprevisionnelObj)
  .then(()=> res.status(200).json({succes: "La modification du budget prévisionnel a réussi!"}))
  .catch(()=> res.status(400).json({error: "Echec de la modification!"}))
}

function getAsingleBudgetPrevisionnel(req, res, next){
  const id= req.params.id
  BudgetPrevisionnel.getAsingleBudgetPrevisionnelInModel(id)
      .then(budgetprevisionnel=> res.status(200).json(budgetprevisionnel))
      .catch(error=> res.status(400).json(error))
}


module.exports={  
  disableBudgetPrevisionnel,
  deleteBudgetPrevisionnel,
  addBudgetPrevisionnel,
  updateBudgetPrevisionnel,
  getAsingleBudgetPrevisionnel,
  budgetPrevisionnellectBy
}


