const Onglet= require("../models/Onglets")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initOngletClass= require("../classes/onglets")


function addOnglet(req, res,next){
      
           
        
        initOngletClass.onglet.id= req.body.id 
        initOngletClass.onglet.libelle= req.body.libelle
       // initOngletClass.Onglet.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     Onglet.checkIfOngletExists(initOngletClass.onglet) 
          .then(onglet=> {
                if(onglet.length==0){
                      Onglet.addOngletInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet onglet existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}





//supression logique d'un utilisateur
function disableOnglet(req, res, next){
    Onglet.disableOngletInModel(req,res)
}


 
module.exports={
    disableOnglet,
    addOnglet,
   
}