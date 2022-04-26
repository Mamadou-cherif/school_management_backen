const Prefectures= require("../models/prefectures")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
const Structure= require("../models/structure")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")




  function getAllStructure(req,res, next){

    Structure.getAllStructureInModel(req)
       .then(structure=> res.status(200).json(structure))
       .catch(error=> res.status(400).json(error))
  }


  module.exports={
    getAllStructure
  }