const Regions= require("../models/region")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initRegionsClass= require("../classes/regions")

  function regionSelectBy(req, res, next){
    initRegionsClass.paysId= req.body.paysId
    Regions.regionSelectByInModel(initRegionsClass)
    .then(regions=> res.status(200).json(regions))
    .catch(error=> res.status(400).json({error}))
  }

  module.exports={
    
    regionSelectBy
  }