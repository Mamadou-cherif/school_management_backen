const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const Evaluation = require("../models/evaluation")
app.use(bodyParser.json())


//const initPrefecturesClass= require("../classes/prefectures")

function getAllEvaluation(req, res, next) {

  Evaluation.getAllEvaluationInModel(req)
    .then(evaluation => res.status(200).json(evaluation))
    .catch(error => res.status(400).json(error))
}


module.exports = {
  getAllEvaluation
}