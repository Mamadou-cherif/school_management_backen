const Indicateur= require("../models/indicateur")
const express= require("express") 


  function indicateurSelectBy(req, res, next){
  const indicateur={
    id: req.body.id || null,
    chaineResultatId: req.body.chaineResultatId || null,
    libelle: req.body.libelle|| null,
    valeurInitiale: req.body.valeurInitiale|| null,
    observations: req.body.observations|| null,
    estActif: 1|| null,
    creationDate: req.body.creationDate|| null,
    creationUserId: req.body.creationUserId|| null,
    modifDate: req.body.modifDate|| null,
    modifUserId: req.body.modifUserId|| null,
    debutDonnees: req.body.debutDonnees|| null,
    finDonnees: req.body.finDonnees|| null,
  }
    
    Indicateur.indicateurSelectByInModel(indicateur)
    .then(indicateur=> res.status(200).json(indicateur))
    .catch(error=> res.status(400).json({error}))
    
  }

    
  function addIndicateur(req, res,next){
    const indicateurObj={
      chaineResultatId: req.body.chaineResultatId ,
      libelle: req.body.libelle,
    }
      
      Indicateur.indicateurSelectByInModel(indicateurObj)
      .then(indicateur=> {
        if(indicateur.length==0){
          const indicateurObj={
            chaineResultatId: req.body.chaineResultatId ,
            libelle: req.body.libelle,
            valeurInitiale: req.body.valeurInitiale,
            observations: req.body.observations,
            creationUserId: req.body.creationUserId
           
          }
          Indicateur.addIndicateurInModel(indicateurObj)
            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée d'ajout"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet indicateur existe déjà"})
          }
      })
      .catch(error=> res.status(400).json({error}))
  }
  
  
  
  
  
  //supression en dur
  function deleteIndicateur(req, res, next){
      
  }
  
  //supression logique d'un utilisateur
  function disableIndicateur(req, res, next){
    const indicateur={
      id: req.body.id ,
      modifDate: req.body.modifDate,
      modifUserId: req.body.modifUserId,
    
    }

    Indicateur.disableIndicateurInModel(indicateur)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "le disable n'a pas marché!"}));
  }
  
  
  
  function updateIndicateur(req,res, next){
    const indicateurObj={
      chaineResultatId: req.body.chaineResultatId,
      libelle: req.body.libelle,
    }
      
      Indicateur.indicateurSelectByInModel(indicateurObj)
      .then(indicateur=> {
        if((indicateur.length==0) || (indicateur[0].id== req.body.id)){
          const indicateurObj={
            id: req.body.id ,
            chaineResultatId: req.body.chaineResultatId ,
            libelle: req.body.libelle,
            valeurInitiale: req.body.valeurInitiale,
            observations: req.body.observations,
            modifDate: req.body.modifDate,
            modifUserId: req.body.modifUserId,
           
          }
          Indicateur.updateIndicateurInModel(indicateurObj)
            .then(()=> res.status(201).json({succes: "Modification effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée de Modification"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet indicateur existe déjà"})
          }
      })
      .catch(error=> res.status(400).json({error}))
   
  }
  
  function getAsingleIndicateur(req, res, next){
    const id= req.params.id
    Indicateur.getAsingleIndicateurInModel(id)
    .then(indicateur=> res.status(200).json(indicateur))
    .catch(error=> res.status(400).json(error))
  }
  
  
  function getAllIndicateurs(req,res, next){ 
    Indicateur.getAllIndicateurInModel(req)
    .then(execution => res.status(200).json(execution))
    .catch(error => res.status(400).json(error))
  }  
  

 

  module.exports={    
    indicateurSelectBy,
     disableIndicateur,
    deleteIndicateur,
    addIndicateur,
    updateIndicateur,
    getAsingleIndicateur,
    getAllIndicateurs,
  }