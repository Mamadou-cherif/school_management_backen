const Quartiers= require("../models/quartier")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initQuartiersClass= require("../classes/quartier")

  function quartierSelectBy(req, res, next){
    initQuartiersClass.communeId= req.body.communeId
    Quartiers.quartierSelectByInModel(initQuartiersClass)
    .then(quartiers=> res.status(200).json(quartiers))
    .catch(error=> res.status(400).json({error}))
  }

  module.exports={
    
    quartierSelectBy
  }