const Prefectures= require("../models/prefecture")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initPrefecturesClass= require("../classes/prefecture")

  function prefectureSelectBy(req, res, next){
    initPrefecturesClass.regionId= req.body.regionId
    Prefectures.prefectureSelectByInModel(initPrefecturesClass)
    .then(prefectures=> res.status(200).json(prefectures))
    .catch(error=> res.status(400).json({error}))
  }

  module.exports={
    
    prefectureSelectBy
  }