const Onglet= require("../models/Onglets")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initOngletClass= require("../classes/onglets")


function addOnglet(req, res,next){
      
          
        
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

function getOngletByGroupe(req, res, next){
      Onglet.getOngletByGroupeModel(req)
        .then(onglets=> res.status(201).json(onglets))
        .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
// Les onglets affectés à un groupe(dans onglet)
function getAffectesByGroupeAndMenu(req, res, next){
  Onglet.getAffectesByGroupeAndMenuInModel(req)
  .then(onglets=> res.status(200).json(onglets))
  .catch(error=> res.status(400).json({error}))
} 
 
// renvoi tous les menuss qui ont des onglets qui sont affectés a un groupe
function getOngletsAffecteAUnGroupe(req, res, next){
  Onglet.getOngletsAffecteAUnGroupeInModel(req)
  .then(onglets=> res.status(200).json(onglets))
  .catch(error=> res.status(400).json({error}))
} 

function getOngletById(req, res, next){
  Onglet.getOngletByIdInModel(req)
  .then(onglet=> res.status(200).json({onglet}))
  .catch(error=> res.status(400).json({error}))
} 

function checkIfOngletExists(req, res, next){
  objOnglet={
    menuId: req.body.menuId
  }
  Onglet.checkIfOngletExists(objOnglet)
  .then(onglet=> res.status(200).json(onglet))
  .catch(error=> res.status(400).json({error}))
}

function updateOnglet(req, res, next){
    
  initOngletClass.onglet.libelle= req.body.libelle
  
  // initMenuClass.Menu.observations= req.body.observations
//verifie si l'utilisateur existe en base
Onglet.checkIfOngletExists(initOngletClass.onglet) 
    .then(onglet=> {
          if(onglet.length==0){ 
                Onglet.updateOngletInModel(req)
                    .then(()=> res.status(201).json({succes: "la modification a reussi"}))
                    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké de modification"}));
          }
          else
              {
                res.status(500).json({error: "Ce Menu existe déjà"})
              }
    })
    .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}


module.exports={
    updateOnglet,
    getOngletByGroupe,
    disableOnglet,
    addOnglet,
    getAffectesByGroupeAndMenu,
    getOngletsAffecteAUnGroupe,
    getOngletById,
    checkIfOngletExists
}