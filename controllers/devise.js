const Devise= require("../models/devise")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initDeviseClass= require("../classes/devise")

  function deviseSelectBy(req, res, next){
    initDeviseClass.prefectureId= req.body.prefectureId
    Devise.communeSelectByInModel(initDeviseClass)
    .then(devises=> res.status(200).json(devises))
    .catch(error=> res.status(400).json({error}))
  }

  function selectAllDevise(req,res, next){

    Devise.selectAllDeviseInModel(req)
       .then(devises=> res.status(200).json(devises))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdDevise(req, res, next){
    const id= req.params.id
    Devise.selectByIdDeviseInModel(id)
    .then(devise=> res.status(200).json(devise))
    .catch(error=> res.status(400).json(error))
  }


  function addDevise(req, res,next){

    initDeviseClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     Devise.deviseSelectByInModel(initDeviseClass)
          .then(devises=> {
                if(devises.length==0){
                    initDeviseClass.symbole= req.body.symbole
                    initDeviseClass.creationUserId= req.body.creationUserId
                    Devise.addDeviseInModel(initDeviseClass)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée devises_insert"}));
                }
                else
                {
                     res.status(500).json({error: "Cette commune existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée devises_selectBy"}))
}


function updateDevise(req, res,next){

  initDeviseClass.libelle= req.body.libelle
     
   //verifie si l'utilisateur existe en base
   Devise.deviseSelectByInModel(initDeviseClass)
        .then(devises=> {
              if((devises.length==0) || (devises[0].id== req.body.id)){
                  initDeviseClass.symbole= req.body.symbole
                  initDeviseClass.modifUserId= req.body.modifUserId
                  initDeviseClass.modifDate= req.body.modifDate
                  initDeviseClass.id= req.body.id
                  Devise.updateDeviseInModel(initDeviseClass)
                        .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée devises_update"}));
              }
              else
              {
                   res.status(500).json({error: "Cette commune existe déjà"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée devises_selectBy"}))
}


//supression logique d'un axe
function deleteDevise(req, res, next){
  Devise.deleteDeviseInModel(req.body.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car cette commune appartient dans une autre table"}));
}
 

  module.exports={
    
    deviseSelectBy,
    selectAllDevise,
    selectByIdDevise,
    addDevise,
    updateDevise,
    deleteDevise

  }