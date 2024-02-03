const application= require("../models/application")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json())


  function selectAllApplication(req,res, next){

    application.selectAllApplicationInModel(req)
       .then(applications=> res.status(200).json(applications))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdApplication(req, res, next){
    const id= req.params.id
    application.selectByIdApplicationInModel(id)
    .then(application=> res.status(200).json(application))
    .catch(error=> res.status(400).json(error))
  }


  function addApplication(req, res,next){
   
      const objApplication={
              libelle:req.body.libelle,
              description:req.body.description,
              logo:req.body.logo,
              proprietaire:req.body.proprietaire,
              emplacementLog:req.body.emplacementLog,
              repInstallation:req.body.repInstallation,
              urlRacine:req.body.urlRacine,
              emailAdmin:req.body.emailAdmin,
              couleur1Id:req.body.couleur1Id,
              couleur2Id:req.body.couleur2Id,
              version:req.body.version,
              observations:req.body.observations,
            creationUserId:req.body.creationUserId,
      }

    application.addApplicationInModel(objApplication)
      .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée application_insert"}));
 
}


function updateApplication(req, res,next){

  const objApplication={
    id:req.body.id,
    libelle:req.body.libelle,
    description:req.body.description,
    logo:req.body.logo,
    proprietaire:req.body.proprietaire,
    emplacementLog:req.body.emplacementLog,
    repInstallation:req.body.repInstallation,
    urlRacine:req.body.urlRacine,
    emailAdmin:req.body.emailAdmin,
    couleur1Id:req.body.couleur1Id,
    couleur2Id:req.body.couleur2Id,
    version:req.body.version,
    observations:req.body.observations,
    modifDate:req.body.modifDate,
    modifUser:req.body.modifUser,
}
application.updateApplicationInModel(objApplication)
      .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typedocuments_update"}));

 }


//supression logique d'un type document
function deleteApplication(req, res, next){
  application.deleteApplicationInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car ce type de document est dans une autre table"}));
}
 
  module.exports={
    selectAllApplication,
    selectByIdApplication,
    addApplication,
    updateApplication,
    deleteApplication
  }