const Hypothese= require("../models/hypothese")



  

  function addHypothese(req, res,next){
    const hypotheseObj={
      chaineResultatId: req.body.chaineResultatId,
      libelle: req.body.libelle,
      estActif:1
    }
      
      Hypothese.hypotheseSelectByInModel(hypotheseObj)
      .then(hypothese=> {
        if(hypothese.length==0){
          const hypotheseObj={
            chaineResultatId: req.body.chaineResultatId ,
            libelle: req.body.libelle,
            creationUserId: req.body.creationUserId,
          }
          Hypothese.addHypotheseInModel(hypotheseObj)
            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée d'ajout"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet hypothese existe déjà"})
          }
      })
      .catch(error=> res.status(400).json({error}))
  }
  
  function updateHypothese(req, res,next){
    const hypotheseObj={
      chaineResultatId: req.body.chaineResultatId,
      libelle: req.body.libelle,
      estActif:1
    }
      Hypothese.hypotheseSelectByInModel(hypotheseObj)
      .then(hypothese=> {
        if((hypothese.length==0) || (hypothese[0].id== req.body.id)){
          const hypotheseObj={
            id: req.body.id,
            chaineResultatId: req.body.chaineResultatId ,
            libelle: req.body.libelle,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }
          Hypothese.updateHypotheseInModel(hypotheseObj)
            .then(()=> res.status(200).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée d'ajout"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet hypothese existe déjà"})
          }
      })
      .catch(error=> res.status(400).json({error}))
  }
  
  
  
  
  

  
  function disableHypothese(req, res, next){
    const hypothese={
      id: req.body.id,
      modifDate: req.body.modifDate,
      modifUserId: req.body.modifUserId,

    }
    Hypothese.disableHypotheseInModel(hypothese)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "le disable n'a pas marché!"}));
  }
  
  
  

  
  function getAsingleHypothese(req, res, next){
    const id= req.params.id
    Hypothese.getAsingleHypotheseInModel(id)
    .then(hypothese=> res.status(200).json(hypothese))
    .catch(error=> res.status(400).json(error))
  }

  function hypotheseSelectBy(req, res, next){
    const hypotheseObj={
      id: req.body.id || null,
      chaineResultatId: req.body.chaineResultatId || null,
      libelle: req.body.libelle || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debutDonnees: req.body.debutDonnees || null,
      finDonnees: req.body.finDonnees || null
  
     }
     
      Hypothese.hypotheseSelectByInModel(hypotheseObj)
      .then(hypothese=> res.status(200).json(hypothese))
      .catch(error=> res.status(400).json({error}))
  }
  
  
  function getAllHypotheses(req,res, next){ 
   
  }
  

 

  module.exports={    
    disableHypothese,
    addHypothese,
    updateHypothese,
    getAsingleHypothese,
    getAllHypotheses,
    hypotheseSelectBy,
    
  }
