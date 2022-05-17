const CategorieAction= require("../models/categorieaction")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initCategorieActionClass= require("../classes/categorieaction")


function addCategorieAction(req, res,next){

    initCategorieActionClass.libelle= req.body.libelle
     //verifie si l'utilisateur existe en base
     CategorieAction.checkIfCategorieActionExists(initCategorieActionClass)
          .then(categorieaction=> {
                if(categorieaction.length==0){
                    initCategorieActionClass.code= req.body.code
                    initCategorieActionClass.libelle= req.body.libelle
                    initCategorieActionClass.creationUserId= req.body.creationUserId
                    CategorieAction.addCategorieActionInModel(initCategorieActionClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stockée d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet categorieaction existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}

//supression logique d'un categorieaction
function disableCategorieAction(req, res, next){
    initCategorieActionClass.id= req.body.id
    initCategorieActionClass.modifUserId= req.body.modifUserId
    initCategorieActionClass.modifDate= req.body.modifDate

    CategorieAction.disableCategorieActionInModel(initCategorieActionClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateCategorieAction(req,res, next){
        
       
    initCategorieActionClass.libelle= req.body.libelle
       
    //verifie si l'utilisateur existe en base
    CategorieAction.checkIfCategorieActionExists(initCategorieActionClass)
         .then(categorieaction=> {
               if((categorieaction.length==0) || (categorieaction[0].id== req.body.id) ){
                   initCategorieActionClass.id= req.body.id
                   initCategorieActionClass.code= req.body.code
                   initCategorieActionClass.libelle= req.body.libelle
                   initCategorieActionClass.modifDate= req.body.modifDate
                   initCategorieActionClass.modifUserId= req.body.modifUserId
                   CategorieAction.updateCategorieActionInModel(initCategorieActionClass)
                         .then(()=> res.status(200).json({succes: "la création a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet categorieaction existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

}


function getAsingleCategorieAction(req, res, next){
    const id= req.params.id
    CategorieAction.getCategorieActionByIdInModel(id)
        .then(categorieaction=> res.status(200).json(categorieaction))
        .catch(error=> res.status(400).json(error))
}  


function getAllCategorieActions(req,res, next){
    initCategorieActionClass.estActif= req.body.estActif
    initCategorieActionClass.debut= req.body.debut
    initCategorieActionClass.fin= req.body.fin

     CategorieAction.getAllCategorieActionInModel(initCategorieActionClass)
        .then(categorieactions=> res.status(200).json(categorieactions))
        .catch(error=> res.status(400).json(error))
}


function deleteCategorieAction(req, res, next){
    console.log(req.params.id)
    CategorieAction.deleteCategorieActionInModel(req.params.id)
    .then(()=> res.status(200).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car ce pays appartient dans une autre table"}));
}


 
module.exports={
    deleteCategorieAction,
    disableCategorieAction,
    addCategorieAction,
    updateCategorieAction,
    getAsingleCategorieAction,
    getAllCategorieActions
}