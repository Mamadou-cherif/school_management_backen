const Investissement = require("../models/investissement")

const initInvestissementClass = require("../classes/investissement")

function investissementSelectBy(req, res, next) {

  const investissement = {
    id: req.body.id || null,
    projetId: req.body.projetId || null,
    categorieInvestId: req.body.categorieInvestId || null,
    libelle: req.body.libelle || null,
    unite: req.body.unite || null,
    quantite: req.body.quantite || null,
    uniteId: req.body.uniteId || null,
    cout: req.body.cout || null,
    deviseId: req.body.deviseId || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null
  }

  Investissement.investissementSelectByInModel(investissement)
    .then(investissement => res.status(200).json(investissement))
    .catch(error => res.status(400).json({ error }))

}


function getAllInvestissement(req, res, next) {

  // Investissement.getAllInvestissement(req)
  //    .then(prestaire=> res.status(200).json(prestaire))
  //    .catch(error=> res.status(400).json(error))
}





  
  function addInvestissement(req, res,next){
    const investissementObj={
      libelle: req.body.libelle,
      projetId: req.body.projetId,
      estActif: 1,
    }
      
      Investissement.investissementSelectByInModel(investissementObj)
      .then(investissement=> {
        if(investissement.length==0){
          const investissement={
            projetId: req.body.projetId,
            categorieInvestId: req.body.categorieInvestId, 
            libelle: req.body.libelle,
            unite: req.body.unite,
            quantite: req.body.quantite,
            uniteId: req.body.uniteId,
            cout: req.body.cout,
            deviseId: req.body.deviseId,
            observations: req.body.observations,
            creationUserId: req.body.creationUserId,
           
          
        }
          Investissement.addInvestissementInModel(investissement)
            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée d'ajout"}));
          
        }
        else
          {
                res.status(500).json({error: "Cet investissement existe déjà sur ce projet"})
          }
      })
      .catch(error=> res.status(400).json({error}))
  }
  
  
  
  
  
  //supression en dur
  function deleteInvestissement(req, res, next){
      
  }
  
  //supression logique d'un utilisateur
  function disableInvestissement(req, res, next){
    const investissement={
      id: req.body.id,
      modifDate: req.body.modifDate,
      modifUserId: req.body.modifUserId,
  }

  Investissement.disableInvestissementInModel(investissement)
    .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "le disable n'a pas marché!" }));
}

function updateInvestissement(req,res, next){
  const investissementObj={
    libelle: req.body.libelle,
    projetId: req.body.projetId,
    estActif: 1,
  }
    
    Investissement.investissementSelectByInModel(investissementObj)
    .then(investissement=> {
      if((investissement.length==0) || (investissement[0].id== req.body.id)){
        const investissement={
          id: req.body.id,
          projetId: req.body.projetId,
          categorieInvestId: req.body.categorieInvestId, 
          libelle: req.body.libelle,
          unite: req.body.unite,
          quantite: req.body.quantite,
          uniteId: req.body.uniteId,
          cout: req.body.cout,
          deviseId: req.body.deviseId,
          observations: req.body.observations,
          modifDate: req.body.modifDate,
          modifUserId: req.body.modifUserId,
      }
      
        Investissement.updateInvestissementInModel(investissement)
          .then(()=> res.status(201).json({succes: "Modification effectué avec succès"}))
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée de Modification"}));
        
      }
      else
        {
              res.status(500).json({error: "Cet investissement existe déjà sur ce projet"})
        }
    })
    .catch(error=> res.status(400).json({error}))
 
}

function getAsingleInvestissement(req, res, next){
  const id= req.params.id
  Investissement.getAsingleInvestissementInModel(id)
  .then(investissement=> res.status(200).json(investissement))
  .catch(error=> res.status(400).json(error))
}




module.exports = {
  disableInvestissement,
  deleteInvestissement,
  addInvestissement,
  updateInvestissement,
  getAsingleInvestissement,
  investissementSelectBy,
  getAllInvestissement
}



