const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const ChaineResultat = require("../models/chaineDeResultat")
const initChainedeResultatClasse = require("../classes/chainederesultat")
app.use(bodyParser.json())


//const initPrefecturesClass= require("../classes/prefectures")

function getAllChaine(req, res, next) {

  ChaineResultat.getAllChaineInModel(req)
    .then(chaines => res.status(200).json(chaines))
    .catch(error => res.status(400).json(error))
}


function chainederesultatSelectBy(req, res, next){
  const chainederesultat={
    id: req.body.id || null,
    projetId: req.body.projetId || null,
    rubriqueId: req.body.rubriqueId || null,
    libelle: req.body.libelle || null,
    sourceMoyenVerif: req.body.sourceMoyenVerif || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
}

  ChaineResultat.chainederesultatSelectByInModel(chainederesultat)
    .then(chaines => res.status(200).json(chaines))
    .catch(error => res.status(400).json(error))
}




     
function addChaineResultat(req, res,next){
}





//supression en dur
function deleteChaineResultat(req, res, next){
    
}

//supression logique d'un utilisateur
function disableChaineResultat(req, res, next){
}



function updateChaineResultat(req,res, next){
    
 
}

function getAsingleChaineResultat(req, res, next){

}






module.exports={  
  disableChaineResultat,
  deleteChaineResultat,
  addChaineResultat,
  updateChaineResultat,
  getAsingleChaineResultat,
  getAllChaine,
  chainederesultatSelectBy
}
