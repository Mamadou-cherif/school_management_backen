const rubriqueEvaluation= require("../models/rubriqueEvaluation")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json())
const initRubriqueEvaluationClass= require("../classes/rubriqueEvaluation")


  function selectAllRubriqueEvaluation(req,res, next){

    rubriqueEvaluation.selectAllRubriqueEvaluationInModel(req)
        .then(rubEvaluations=> res.status(200).json(rubEvaluations))
        .catch(error=> res.status(400).json(error))
    }

  function selectByIdRubriqueEvaluation(req, res, next){
      const id= req.params.id
      rubriqueEvaluation.selectByIdRubriqueEvaluationInModel(id)
      .then(rubEvaluation=> res.status(200).json(rubEvaluation))
      .catch(error=> res.status(400).json(error))
  }


  function addRubriqueEvaluation(req, res,next){
          const objRubEvaluation={
            libelle: req.body.libelle,
            estActif:1
        }
          
     rubriqueEvaluation.rubriqueEvaluationSelectByInModel(objRubEvaluation)
          .then(rubEvaluations=> {
                if(rubEvaluations.length == 0){

                  const objRubEvaluation={
                      code: req.body.code,
                      estActif:1
                   }
                  
             rubriqueEvaluation.rubriqueEvaluationSelectByInModel(objRubEvaluation)
                  .then(code=> {
                        if(code.length == 0){
                           initRubriqueEvaluationClass.libelle = req.body.libelle
                             initRubriqueEvaluationClass.code= req.body.code
                            initRubriqueEvaluationClass.creationUserId= req.body.creationUserId
                            rubriqueEvaluation.addRubriqueEvaluationInModel(initRubriqueEvaluationClass)
                                  .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_insert"}));
                        }
                        else
                        {
                             res.status(500).json({error: "Ce code de cette rubrique existe déjà"})
                        }
                  })
                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_selectBy"}))
        
                }
                else
                {
                     res.status(500).json({error: "Cette rubrique existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_selectBy"}))

     }


function updateRubriqueEvaluation(req, res,next){
    
  const objRubEvaluation={
    libelle: req.body.libelle,
    estActif:1
  }
     rubriqueEvaluation.rubriqueEvaluationSelectByInModel(objRubEvaluation)
          .then(rubEvaluations=> {
              if((rubEvaluations.length == 0) || (rubEvaluations[0].id == req.body.id)){
                const objRubEvaluation={
                  code: req.body.code,
                  estActif:1
                }
                   rubriqueEvaluation.rubriqueEvaluationSelectByInModel(objRubEvaluation)
                        .then(codes=> {
                            if((codes.length == 0) || (codes[0].id == req.body.id)){
                               initRubriqueEvaluationClass.libelle = req.body.libelle
                                initRubriqueEvaluationClass.id= req.body.id
                                initRubriqueEvaluationClass.code= req.body.code
                                initRubriqueEvaluationClass.modifUserId= req.body.modifUserId
                                initRubriqueEvaluationClass.modifDate= req.body.modifDate
                                rubriqueEvaluation.updateRubriqueEvaluationInModel(initRubriqueEvaluationClass)
                                      .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                                      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_update"}));
                            }
                            else
                            {
                                 res.status(500).json({error: "Ce code de cette rubrique existe déjà"})
                            }
                      })
                      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_selectBy"}))
              
              }
              else
              {
                   res.status(500).json({error: "Cette rubrique existe déjà"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée rubriqueevaluations_selectBy"}))


      }


//supression logique d'un axe
function deleteRubriqueEvaluation(req, res, next){
  rubriqueEvaluation.deleteRubriqueEvaluationInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car Cette rubrique est dans une autre table"}));
}
 

  module.exports={
    selectAllRubriqueEvaluation,
    selectByIdRubriqueEvaluation,
    addRubriqueEvaluation,
    updateRubriqueEvaluation,
    deleteRubriqueEvaluation
  }