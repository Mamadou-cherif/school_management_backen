const ValeurCible = require("../models/valeurcible")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")



  
 
  

  
  
  function addValeurCible(req, res, next) {
    const valeurcibleObj = {
      indicateurId: req.body.indicateurId,
      anneeCibleId: req.body.anneeCibleId,
    } 
    ValeurCible.valeurcibleSelectByInModel(valeurcibleObj)
      .then(valeurcible=>{
        if(valeurcible.length==0){
         const valeurcibleObj = {
            indicateurId: req.body.indicateurId,
            anneeCibleId: req.body.anneeCibleId,
            anneeReelle: req.body.anneeReelle,
            valeurProjetee: req.body.valeurProjetee,
            observations: req.body.observations,
            creationUserId: req.body.creationUserId,
        
          }
                     
          ValeurCible.addValeurCibleInModel(valeurcibleObj)
              .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
              .catch(() => res.status(400).json({error: "Erreur de la procedure stockée valeurcibles_insert" }));
        
        }
        else{
          return res.status(400).json({ error: "dupplicata de la valeur cible" })
        }
      })
      .catch(()=> res.status(400).json({error: "la fonction selectBy a échoué"}))
      
  
}
  
  
 function updateValeurCible(req, res, next) {
          
    const valeurcibleObj = {
      indicateurId: req.body.indicateurId,
      anneeCibleId: req.body.anneeCibleId,
    } 
    ValeurCible.valeurcibleSelectByInModel(valeurcibleObj)
      .then(valeurcible=>{ 
        if((valeurcible.length==0) || (valeurcible[0].id == req.body.id)){
          const valeurcibleObj = {
            id: req.body.id,
            indicateurId: req.body.indicateurId,
            anneeCibleId: req.body.anneeCibleId,
            anneeReelle: req.body.anneeReelle,
            valeurProjetee: req.body.valeurProjetee,
            observations: req.body.observations,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
        
          }
                     
            ValeurCible.updateValeurCibleInModel(valeurcibleObj)
              .then(() => res.status(201).json({ succes: "Modification effectuéé avec succès" }))
              .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée valeurcibles_insert" }));
         
        }
        else{
          return res.status(400).json({ error: "dupplicata de la valeur cible" })
        }
      })
      .catch(()=> res.status(400).json({error: "la fonction selectBy a échoué"}))
      
    
 }
  
   
 function disableValeurCible(req, res, next) {

    const obj = {
      id: req.body.id,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    ValeurCible.disableValeurCibleInModel(obj)
      .then(() => res.status(201).json({ succes: "La suppression a reussi" }))
      .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de suppression" }));
  }
  
  
  
  

function selectAllValeurCible(req, res, next) {

    ValeurCible.selectAllValeurInModel(req)
      .then(valeurcible => res.status(200).json(valeurcible))
      .catch(error => res.status(400).json(error))
  }

  function selectValeurCibleByProjetId(req, res, next) {
    const id= req.params.id
    ValeurCible.selectValeurCibleByProjetIdInModel(id)
      .then(valeurcible => res.status(200).json(valeurcible))
      .catch(error => res.status(400).json(error))
  }


  function getAsingleValeurCible(req, res, next){
    const id= req.params.id
    ValeurCible.getAsingleValeurCibleInModel(id)
    .then(valeurcible=> res.status(200).json(valeurcible))
    .catch(error=> res.status(400).json(error))
  }

  module.exports= {
      selectAllValeurCible,
      selectValeurCibleByProjetId,
      addValeurCible,
      updateValeurCible,
      disableValeurCible,
      getAsingleValeurCible
  }