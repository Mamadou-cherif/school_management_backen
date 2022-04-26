const Communes= require("../models/communes")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initCommunesClass= require("../classes/communes")

  function communeSelectBy(req, res, next){
    initCommunesClass.prefectureId= req.body.prefectureId
    Communes.communeSelectByInModel(initCommunesClass)
    .then(communes=> res.status(200).json(communes))
    .catch(error=> res.status(400).json({error}))
  }

  module.exports={
    
    communeSelectBy
  }