const Hypothese= require("../models/hypothese")


  function hypotheseSelectBy(req, res, next){
  
  const execution={
    id: req.body.id || null,
    chaineResultatId: req.body.chaineResultatId || null,
    libelle: req.body.libelle || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }
    Hypothese.hypotheseSelectByInModel(execution)
    .then(hypothese=> res.status(200).json(hypothese))
    .catch(error=> res.status(400).json({error}))
    
  }

  function addHypothese(req, res,next){
    const hypotheseObj={
      libelle: req.body.libelle,
    }
      
      Hypothese.hypotheseSelectByInModel(hypotheseObj)
      .then(hypothese=> {
        if(hypothese.length==0){
          const hypotheseObj={
            id: req.body.id || null,
            chaineResultatId: req.body.chaineResultatId || null,
            libelle: req.body.libelle|| null,
            estActif: 1|| null,
            creationDate: req.body.creationDate|| null,
            creationUserId: req.body.creationUserId|| null,
            modifDate: req.body.modifDate|| null,
            modifUserId: req.body.modifUserId|| null,
            debutDonnees: req.body.debutDonnees|| null,
            finDonnees: req.body.finDonnees|| null,
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
  
  
  
  
  
  
  function deleteHypothese(req, res, next){
      
  }
  
  function disableHypothese(req, res, next){
    const hypothese={
      id: req.body.id || null,
      chaineResultatId: req.body.chaineResultatId || null,
      libelle: req.body.libelle|| null,
      estActif: 1|| null,
      creationDate: req.body.creationDate|| null,
      creationUserId: req.body.creationUserId|| null,
      modifDate: req.body.modifDate|| null,
      modifUserId: req.body.modifUserId|| null,
      debutDonnees: req.body.debutDonnees|| null,
      finDonnees: req.body.finDonnees|| null,
    }

    Hypothese.disableHypotheseInModel(hypothese)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "le disable n'a pas marché!"}));
  }
  
  
  
  function updateHypothese(req,res, next){
    const hypotheseObj={
      libelle: req.body.libelle,
    }
      
      Hypothese.hypotheseSelectByInModel(hypotheseObj)
      .then(hypothese=> {
        if((hypothese.length==0) || (hypothese[0].id== req.body.id)){
          const hypotheseObj={
            id: req.body.id || null,
            chaineResultatId: req.body.chaineResultatId || null,
            libelle: req.body.libelle|| null,
            estActif: 1|| null,
            creationDate: req.body.creationDate|| null,
            creationUserId: req.body.creationUserId|| null,
            modifDate: req.body.modifDate|| null,
            modifUserId: req.body.modifUserId|| null,
            debutDonnees: req.body.debutDonnees|| null,
            finDonnees: req.body.finDonnees|| null,
          }
          Hypothese.updateHypotheseInModel(hypotheseObj)
            .then(()=> res.status(201).json({succes: "Modification effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée de Modification"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet hypothese existe déjà"})
          }
      })
      .catch(error=> res.status(400).json({error}))
   
  }
  
  function getAsingleHypothese(req, res, next){
    const id= req.params.id
    Hypothese.getAsingleHypotheseInModel(id)
    .then(hypothese=> res.status(200).json(hypothese))
    .catch(error=> res.status(400).json(error))
  }
  
  
  function getAllHypotheses(req,res, next){ 
   
  }
  

 

  module.exports={    
     disableHypothese,
    deleteHypothese,
    addHypothese,
    updateHypothese,
    getAsingleHypothese,
    getAllHypotheses,
    hypotheseSelectBy,

  }
