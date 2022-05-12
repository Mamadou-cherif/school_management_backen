const Quartier= require("../models/quartier")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initQuartiersClass= require("../classes/quartier")

  function quartierSelectBy(req, res, next){
    initQuartiersClass.communeId= req.body.communeId
    Quartier.quartierSelectByInModel(initQuartiersClass)
    .then(quartiers=> res.status(200).json(quartiers))
    .catch(error=> res.status(400).json({error}))
  }

  

  function selectAllQuartier(req,res, next){

    Quartier.selectAllQuartierInModel(req)
       .then(commnunes=> res.status(200).json(commnunes))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdQuartier(req, res, next){
    const id= req.params.id
    Quartier.selectByIdQuartierInModel(id)
    .then(commune=> res.status(200).json(commune))
    .catch(error=> res.status(400).json(error))
  }


  function addQuartier(req, res,next){

    initQuartiersClass.libelle= req.body.libelle
    initQuartiersClass.communeId= req.body.communeId
       
     //verifie si l'utilisateur existe en base
     Quartier.quartierSelectByInModel(initQuartiersClass)
          .then(quartiers=> {
                if(quartiers.length==0){
                    initQuartiersClass.code= req.body.code
                    initQuartiersClass.creationUserId= req.body.creationUserId
                    Quartier.addQuartierInModel(initQuartiersClass)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée prefectures_insert"}));
                }
                else
                {
                     res.status(500).json({error: "Ce quatier existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée prefectures_selectBy"}))
}


function updateQuartier(req, res,next){

  initQuartiersClass.libelle= req.body.libelle
    initQuartiersClass.communeId= req.body.communeId
     
   //verifie si l'utilisateur existe en base
   Quartier.quartierSelectByInModel(initQuartiersClass)
        .then(quartiers=> {
              if((quartiers.length==0) || (quartiers[0].id== req.body.id)){
                  initQuartiersClass.code= req.body.code
                  initQuartiersClass.modifUserId= req.body.modifUserId
                  initQuartiersClass.modifDate= req.body.modifDate
                  initQuartiersClass.id= req.body.id
                  Quartier.updateQuartierInModel(initQuartiersClass)
                        .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée prefectures_update"}));
              }
              else
              {
                   res.status(500).json({error: "Ce quatier existe déjà"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée prefectures_selectBy"}))
}

 
//supression logique d'un axe
function deleteQuartier(req, res, next){
  Quartier.deleteQuartierInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car ce quatier appartient dans une autre table"}));
}
 

  module.exports={
    
    quartierSelectBy,
    selectAllQuartier,
    selectByIdQuartier,
    addQuartier,
    updateQuartier,
    deleteQuartier

  }