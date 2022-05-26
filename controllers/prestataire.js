const Prefectures= require("../models/prefectures")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
const Prestataire= require("../models/prestataire")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")

//const initPrefecturesClass= require("../classes/prefectures")



  function prestataireSelectBy(req, res, next){
    Prestataire.prestataireSelectByInModel(req)
    .then(prestataire=> res.status(200).json(prestataire))
    .catch(error=> res.status(400).json(error))
  }

  function getAllPrestataire(req,res, next){

    Prestataire.getAllPrestataireInModel(req)
       .then(prestaire=> res.status(200).json(prestaire))
       .catch(error=> res.status(400).json(error))
  }

     
  function addPrestataire(req, res,next){
  }
  
  
  
  
  
  //supression en dur
  function deletePrestataire(req, res, next){
      
  }
  
  //supression logique d'un utilisateur
  function disablePrestataire(req, res, next){
  }
  
  
  
  function updatePrestataire(req,res, next){
      
   
  }
  
  function getAsinglePrestataire(req, res, next){
  
  }
  

  

  module.exports={  
    disablePrestataire,
    deletePrestataire,
    addPrestataire,
    updatePrestataire,
    getAsinglePrestataire,
    prestataireSelectBy,
    getAllPrestataire
  }

