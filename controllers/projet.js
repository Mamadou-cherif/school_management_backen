const Projet = require("../models/projet")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initProjetClass = require("../classes/projet")

function addProjet(req, res,next){

      const objProjet = {
        code: req.body.code,
        estActif: 1
      }

      Projet.projetSelectByInModel(objProjet)
        .then(projet => {
          if ((projet.length == 0)) {
           
            initProjetClass.libelle= req.body.libelle    
            initProjetClass.programmeId= req.body.programmeId
            initProjetClass.titre= req.body.titre
            initProjetClass.code = req.body.code 
            initProjetClass.description= req.body.description
            initProjetClass.prioriteId= req.body.prioriteId
            initProjetClass.nature= req.body.nature
            initProjetClass.modalites= req.body.modalites
            initProjetClass.duree= req.body.duree
            initProjetClass.debut= req.body.debut 
            initProjetClass.fin= req.body.fin
            initProjetClass.statutId= req.body.statutId 
            initProjetClass.observations= req.body.observations
            initProjetClass.creationUserId= req.body.creationUserId
            Projet.addProjetInModel(initProjetClass)
            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
          }
          else {
            res.status(500).json({ error: "Ce code existe déjà" })
          }
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée projets_selectBy" }))
   
   
  
 }








//supression logique d'un projet
function disableProjet(req, res, next) {
    initProjetClass.id = req.body.id
    initProjetClass.modifUserId = req.body.modifUserId
    initProjetClass.modifDate = req.body.modifDate

    Projet.disableProjetInModel(initProjetClass)
        .then(() => res.status(201).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

function updateProjet(req, res,next){


    const objProjet = {
        code: req.body.code,
        estActif: 1
      }

      Projet.projetSelectByInModel(objProjet)
        .then(projet => {
          if ((projet.length == 0) || (projet[0].id == req.body.id)) {
           
            initProjetClass.id= req.body.id
            initProjetClass.titre= req.body.titre
            initProjetClass.programmeId= req.body.programmeId
            initProjetClass.code = req.body.code 
            initProjetClass.description= req.body.description
            initProjetClass.prioriteId= req.body.prioriteId
            initProjetClass.nature= req.body.nature
            initProjetClass.modalites= req.body.modalites
            initProjetClass.duree= req.body.duree
            initProjetClass.debut= req.body.debut
            initProjetClass.fin= req.body.fin
            initProjetClass.statutId= req.body.statutId 
            initProjetClass.observations= req.body.observations
            initProjetClass.modifDate= req.body.modifDate
            initProjetClass.modifUserId= req.body.modifUserId
            Projet.updateProjetInModel(initProjetClass)
                .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké de modification"}));
          }
          else {
            res.status(500).json({ error: "Ce code existe déjà" })
          }
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée projets_selectBy" }))
   

       
         

}

function getAsingleProjet(req, res, next){
    const id= req.params.id
    Projet.selectByIdProjetInModel(id)
        .then(projet=> res.status(200).json(projet))
        .catch(error=> res.status(400).json(error))
}


function getAllProjets(req, res, next) {
    initProjetClass.estActif = req.body.estActif
    initProjetClass.debut = req.body.debut
    initProjetClass.fin = req.body.fin

    Projet.selectAllProjetInModel(initProjetClass)
        .then(projets => res.status(200).json(projets))
        .catch(error => res.status(400).json(error))
}


function projetSelectBy(req, res, next) {
    const objProjet = {
        id: req.body.id || null,
        programmeId: req.body.programmeId || null,
        code: req.body.code || null,
        titre: req.body.titre || null,
        description: req.body.description || null,
        prioriteId: req.body.prioriteId || null,
        nature: req.body.nature || null,
        modalites: req.body.modalites || null,
        duree: req.body.duree || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null,
        statutId: req.body.statutId || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debutDonnees: req.body.debutDonnees || null,
        finDonnees: req.body.finDonnees || null,

    }

    Projet.projetSelectByInModel(objProjet)
        .then(projet => res.status(200).json(projet))
        .catch(error => res.status(400).json(error))
}

module.exports = {
    disableProjet,
    addProjet,
    updateProjet,
    getAsingleProjet,
    getAllProjets,
    projetSelectBy
}