const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const Evaluation = require("../models/evaluation")
app.use(bodyParser.json())


 
function getAllEvaluation(req, res, next) {

  Evaluation.getAllEvaluationInModel(req)
    .then(evaluation => res.status(200).json(evaluation))
    .catch(error => res.status(400).json(error))
}


function selectByIdEvaluation(req, res, next) {
  const id = req.params.id
  Evaluation.evaluationSelectByIdInModel(id)
    .then(evaluation => res.status(200).json(evaluation))
    .catch(error => res.status(400).json(error))
}

function selectByIdEvaluation(req, res, next) {
  const id = req.params.id
  Evaluation.evaluationSelectByIdInModel(id)
    .then(evaluation => res.status(200).json(evaluation))
    .catch(error => res.status(400).json(error))
}


function addEvaluation(req, res, next) {
  // const evaluationObj = {
  //   valeurCibleId: req.body.valeurCibleId,
  //   estActif: 1
  // }
  //       Evaluation.evaluationSelectBy(evaluationObj)
  //         .then(evaluation => {
  //           if (evaluation.length == 0) {
                const evaluationObj={
                  valeurCibleId: req.body.valeurCibleId ,
                  tauxAtteint: req.body.tauxAtteint ,
                  observations: req.body.observations ,
                  creationUserId: req.body.creationUserId ,
                }
                console.log(evaluationObj)

              Evaluation.addEvaluationInModel(evaluationObj)
                .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée evaluations_insert" }));
    //         }
    // })
    // .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée evaluations_selectBy" }))
}


function updateEvaluation(req, res, next) {
  // const evaluationObj = {
  //   valeurCibleId: req.body.valeurCibleId,
  //   estActif: 1
  // }
  //       Evaluation.evaluationSelectBy(evaluationObj)
  //         .then(evaluation => {
  //           if (evaluation.length == 0) {
                const evaluationObj={
                  id: req.body.id ,
                  valeurCibleId: req.body.valeurCibleId ,
                  tauxAtteint: req.body.tauxAtteint ,
                  observations: req.body.observations ,
                  modifDate: req.body.modifDate ,
                  modifUserId: req.body.modifUserId
                }

              Evaluation.updateEvaluationInModel(evaluationObj)
                .then(() => res.status(200).json({ succes: "modification effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée evaluations_insert" }));
    //         }
    // })
    // .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée evaluations_selectBy" }))
}



function disableEvaluation(req, res, next) {

  const objEvaluation = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Evaluation.disableEvaluationInModel(objEvaluation)
    .then(() => res.status(200).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}

function selectByEvaluation(req, res, next){
  const evaluationObj={
            id: req.body.id|| null, 
            valeurCibleId: req.body.valeurCibleId || null,
            tauxAtteint: req.body.tauxAtteint || null,
            observations: req.body.observations || null,
            estActif: 1 || null,
            creationDate: req.body.creationDate || null,
            creationUserId: req.body.creationUserId || null,
            modifDate: req.body.modifDate || null,
            modifUserId: req.body.modifUserId || null,
            debutDonnees: req.body.debutDonnees || null,
            finDonnees: req.body.finDonnees || null,

  }
  Evaluation.evaluationSelectBy(evaluationObj)
    .then(evaluation=> res.status(200).json(evaluation))
    .then(error=> res.status(400).json(error))
}

module.exports = {
  selectByIdEvaluation,
  getAllEvaluation,
  addEvaluation,
  disableEvaluation,
  updateEvaluation,
  selectByEvaluation
}