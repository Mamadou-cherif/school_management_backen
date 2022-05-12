const Region= require("../models/region")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initRegionsClass= require("../classes/regions")

  function regionSelectBy(req, res, next){
    initRegionsClass.paysId= req.body.paysId
    Region.regionSelectByInModel(initRegionsClass)
    .then(regions=> res.status(200).json(regions))
    .catch(error=> res.status(400).json({error}))
  }

  function selectAllRegion(req,res, next){

    Region.selectAllRegionInModel(req)
       .then(pays=> res.status(200).json(pays))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdRegion(req, res, next){
    const id= req.params.id
    Region.selectByIdRegionInModel(id)
    .then(pays=> res.status(200).json(pays))
    .catch(error=> res.status(400).json(error))
  }


  function addRegion(req, res,next){

    initRegionsClass.libelle= req.body.libelle
    initRegionsClass.paysId= req.body.paysId
       
     //verifie si l'utilisateur existe en base
     Region.regionSelectByInModel(initRegionsClass)
          .then(region=> {
                if(region.length==0){
                    initRegionsClass.code= req.body.code
                    initRegionsClass.creationUserId= req.body.creationUserId
                    Region.addRegionInModel(initRegionsClass)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée regions_insert"}));
                }
                else
                {
                     res.status(500).json({error: "Cette région existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée regions_selectBy"}))
}


function updateRegion(req, res,next){

  initRegionsClass.libelle= req.body.libelle
  initRegionsClass.paysId= req.body.paysId
     
   //verifie si l'utilisateur existe en base
   Region.regionSelectByInModel(initRegionsClass)
        .then(region=> {
              if((region.length==0) || (region[0].id== req.body.id)){
                  initRegionsClass.code= req.body.code
                  initRegionsClass.modifUserId= req.body.modifUserId
                  initRegionsClass.modifDate= req.body.modifDate
                  initRegionsClass.id= req.body.id
                  Region.updateRegionInModel(initRegionsClass)
                        .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée regions_update"}));
              }
              else
              {
                   res.status(500).json({error: "Cette région existe déjà"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée regions_selectBy"}))
}


//supression logique d'un axe
function deleteRegion(req, res, next){
  Region.deleteRegionInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car cette région appartient dans une autre table"}));
}
 

  module.exports={
    
    regionSelectBy,
    selectAllRegion,
    selectByIdRegion,
    addRegion,
    updateRegion,
    deleteRegion

  }