const Pays= require("../models/pays")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initPaysClass= require("../classes/pays")

function getAllPays(req,res, next){

    Pays.getAllPaysInModel(req)
       .then(pays=> res.status(200).json(pays))
       .catch(error=> res.status(400).json(error))
  }

  function getPaysById(req, res, next){
      Pays.getPaysByIdInModel(req)
    .then(pays=> res.status(200).json(pays))
    .catch(error=> res.status(400).json(error))
  }
  module.exports={
    getAllPays,
    getPaysById
  }