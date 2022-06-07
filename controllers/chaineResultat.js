const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const ChaineResultat = require("../models/chaineDeResultat")
const initChainedeResultatClasse = require("../classes/chainederesultat")
app.use(bodyParser.json())


//const initPrefecturesClass= require("../classes/prefectures")

function getAllChaine(req, res, next) {

  ChaineResultat.getAllChaineInModel(req)
    .then(chaines => res.status(200).json(chaines))
    .catch(error => res.status(400).json(error))
}


function chainederesultatSelectBy(req, res, next){
  const chainederesultat={
    id: req.body.id || null,
    projetId: req.body.projetId || null,
    rubriqueId: req.body.rubriqueId || null,
    libelle: req.body.libelle || null,
    sourceMoyenVerif: req.body.sourceMoyenVerif || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null

  }

  ChaineResultat.chainederesultatSelectByInModel(chainederesultat)
    .then(chaines => res.status(200).json(chaines))
    .catch(error => res.status(400).json(error))
}




     
function addChaineResultat(req, res,next){
  const chaineresultatObj={
    libelle: req.body.libelle,
    estActif:1
}
ChaineResultat.chainederesultatSelectByInModel(chaineresultatObj)
      .then(chaineresultat=> {
            if(chaineresultat.length==0){
                
              const chainederesultat={
                projetId: req.body.projetId,
                rubriqueId: req.body.rubriqueId,
                libelle: req.body.libelle,
                sourceMoyenVerif: req.body.sourceMoyenVerif,
                observations: req.body.observations,
                creationUserId: req.body.creationUserId,
                
            }

                  ChaineResultat.addChaineResultatInModel(chainederesultat)
                      .then(()=> res.status(201).json({succes: "la création a reussi"}))
                      .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
            }
            else
               {
                 res.status(500).json({error: "cette chaine de résultat existe déjà"})
               }
      })
      .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

}





//supression en dur
function deleteChaineResultat(req, res, next){
    
}

//supression logique d'un utilisateur
function disableChaineResultat(req, res, next){
  const chainederesultat={
    id: req.body.id,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId,
  }
  ChaineResultat.disableChaineResultatInModel(chainederesultat)
  .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
  .catch(()=> res.status(400).json({error: "le disable n'a pas marché!"}));
}



function updateChaineResultat(req,res, next){
  const chaineresultatObj={
    libelle: req.body.libelle,
    estActif:1
}
ChaineResultat.chainederesultatSelectByInModel(chaineresultatObj)
      .then(chaineresultat=> {
            if((chaineresultat.length==0) || (chaineresultat[0].id == req.body.id)){
                
              const chainederesultat={
                id: req.body.id,
                projetId: req.body.projetId,
                rubriqueId: req.body.rubriqueId,
                libelle: req.body.libelle,
                sourceMoyenVerif: req.body.sourceMoyenVerif,
                observations: req.body.observations,
                modifDate: req.body.modifDate,
                modifUserId: req.body.modifUserId,
                
            } 

                  ChaineResultat.updateChaineResultatInModel(chainederesultat)
                      .then(()=> res.status(201).json({succes: "la modification a reussi"}))
                      .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
            }
            else
               {
                 res.status(500).json({error: "cette chaine de résultat existe déjà"})
               }
      })
      .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

 
}

function getAsingleChaineResultat(req, res, next){

}






function getAsingleChaineResultat(req, res, next){
  const id= req.params.id
  ChaineResultat.getAsingleChaineResultatInModel(id)
      .then(chaineresultat=> res.status(200).json(chaineresultat))
      .catch(error=> res.status(400).json(error))
}


module.exports={  
  disableChaineResultat,
  deleteChaineResultat,
  addChaineResultat,
  updateChaineResultat,
  getAsingleChaineResultat,
  getAllChaine,
  chainederesultatSelectBy
}
