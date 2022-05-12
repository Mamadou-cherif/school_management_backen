const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const ChaineResultat = require("../models/chaineDeResultat")
app.use(bodyParser.json())


//const initPrefecturesClass= require("../classes/prefectures")

function getAllChaine(req, res, next) {

  ChaineResultat.getAllChaineInModel(req)
    .then(chaines => res.status(200).json(chaines))
    .catch(error => res.status(400).json(error))
}


module.exports = {
  getAllChaine
}