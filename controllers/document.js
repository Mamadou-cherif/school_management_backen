const Document= require("../models/document")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initDocumentClass= require("../classes/document")




function documentsSelectBy(req, res, next){
     initDocumentClass.projetId= req.body.projetId
     
    Document.documentsSelectByInModel(initDocumentClass)
        .then(document=> res.status(200).json(document))
        .catch(error=> res.status(400).json(error))
}








 
module.exports={
    documentsSelectBy
}