const Axe= require("../models/axe")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initAxeClass= require("../classes/axe")


function addAxe(req, res,next){
      
         console.log(req.body)
    const objAxe={
        libelle: req.body.libelle,
        estActif:1
    }
     Axe.axeSelectByInModel(objAxe)
          .then(axe=> {
                if(axe.length==0){
                    const objAxe={
                        code: req.body.code,
                        estActif:1
                    }
                     Axe.axeSelectByInModel(objAxe)
                          .then(codes=> {
                                if(codes.length==0){
                                    const objAxeInsert={
                                        code:req.body.code,
                                        libelle:req.body.libelle,
                                        description:req.body.description,
                                        creationUserId:req.body.creationUserId
                                    }
                                 
                                      Axe.addAxeInModel(objAxeInsert)
                                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                                          .catch(()=> res.status(400).json({error: "Ajout non effectué"}));
                                }
                                else
                                   {
                                     res.status(500).json({error: "Ce code existe déjà"})
                                   }
                          })
                          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée axes_selectBy"}))
                }
                else
                   {
                     res.status(500).json({error: "Cet axe existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

  }

//supression logique d'un axe
function disableAxe(req, res, next){
    initAxeClass.id= req.body.id
    initAxeClass.modifUserId= req.body.modifUserId
    initAxeClass.modifDate= req.body.modifDate

    Axe.disableAxeInModel(initAxeClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateAxe(req, res,next){
      
         
    const objAxe={
        libelle: req.body.libelle,
        estActif:1
    }
     Axe.axeSelectByInModel(objAxe)
          .then(axe=> {
                if((axe.length==0) || (axe[0].id== req.body.id)){
                    const objAxe={
                        code: req.body.code,
                        estActif:1
                    }
                     Axe.axeSelectByInModel(objAxe)
                          .then(codes=> {
                                if((codes.length==0) || (codes[0].id== req.body.id) ){
                                    const objAxeUpdate={
                                        id:req.body.id,
                                        code:req.body.code,
                                        libelle:req.body.libelle,
                                        description:req.body.description,
                                        modifDate:req.body.modifDate,
                                        modifUserId:req.body.modifUserId,
                                    }
                                      Axe.updateAxeInModel(objAxeUpdate)
                                          .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                                          .catch(()=> res.status(400).json({error: "Modification non effectuée"}));
                                }
                                else
                                   {
                                     res.status(500).json({error: "Ce code existe déjà"})
                                   }
                          })
                          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée axes_selectBy"}))
                }
                else
                   {
                     res.status(500).json({error: "Cet axe existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}



function getAsingleAxe(req, res, next){
    const id= req.params.id
    Axe.getAxeByIdInModel(id)
        .then(axe=> res.status(200).json(axe))
        .catch(error=> res.status(400).json(error))
}  


function getAllAxes(req,res, next){
    initAxeClass.estActif= req.body.estActif
    initAxeClass.debut= req.body.debut
    initAxeClass.fin= req.body.fin

     Axe.getAllAxeInModel(initAxeClass)
        .then(axes=> res.status(200).json(axes))
        .catch(error=> res.status(400).json(error))
}



function countAllAxe(req,res, next){
    Axe.countAllAxeInModel()
        .then(nombre=> res.status(200).json(nombre))
        .catch(error=> res.status(400).json(error))
}

function axeSelectByParams(req,res, next){
    const objAxe={
        debut:req.body.debut,
        fin:req.body.fin,
    }
    Axe.axesSelectByParamsInModel(objAxe)
        .then(axes=> res.status(200).json(axes))
        .catch(error=> res.status(400).json(error))
}
module.exports={
    axeSelectByParams,
    countAllAxe,
    disableAxe,
    addAxe,
    updateAxe,
    getAsingleAxe,
    getAllAxes
}