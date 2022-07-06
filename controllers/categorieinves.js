const CategorieInvest= require("../models/categorieinves")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json()) 
const initCategorieInvestClass= require("../classes/categorieinves")


function addCategorieInvest(req, res,next){

    const categorieinvestObj={
        libelle: req.body.libelle,
        estActif: 1,
    } 
     CategorieInvest.checkIfCategorieInvestExists(categorieinvestObj)
          .then(categorieinvest=> {
                if(categorieinvest.length==0){
                
                    const categorieinvestObj={
                        code: req.body.code,
                        estActif: 1,
                    } 
                     CategorieInvest.checkIfCategorieInvestExists(categorieinvestObj)
                          .then(codes=> {
                                if(codes.length==0){
                                    initCategorieInvestClass.libelle= req.body.libelle
                                    initCategorieInvestClass.code= req.body.code
                                    initCategorieInvestClass.libelle= req.body.libelle
                                    initCategorieInvestClass.creationUserId= req.body.creationUserId
                                    CategorieInvest.addCategorieInvestInModel(initCategorieInvestClass)
                                        .then(()=> res.status(201).json({succes: "la création a reussi"}))
                                        .catch(()=> res.status(400).json({error: "erreur de la procédure stockée d'ajout"}));
                                }
                                else
                                   {
                                     res.status(500).json({error: "Ce code de cette catégorie existe déjà"})
                                   }
                          })
                          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                
                
                }
                else
                   {
                     res.status(500).json({error: "Cette catégorie d'investissement existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))


}


function disableCategorieInvest(req, res, next){
    initCategorieInvestClass.id= req.body.id
    initCategorieInvestClass.modifUserId= req.body.modifUserId
    initCategorieInvestClass.modifDate= req.body.modifDate

    CategorieInvest.disableCategorieInvestInModel(initCategorieInvestClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateCategorieInvest(req,res, next){
    const categorieinvest={
        libelle: req.body.libelle,
        estActif: 1
    }
    CategorieInvest.checkIfCategorieInvestExists(categorieinvest)
         .then(categorieinvest=> {
               if((categorieinvest.length==0) || (categorieinvest[0].id== req.body.id) ){
                const categorieinvest={
                    code: req.body.code,
                    estActif: 1
                }
                CategorieInvest.checkIfCategorieInvestExists(categorieinvest)
                     .then(codes=> {
                           if((codes.length==0) || (codes[0].id== req.body.id) ){
                               initCategorieInvestClass.libelle= req.body.libelle
                               initCategorieInvestClass.id= req.body.id
                               initCategorieInvestClass.code= req.body.code
                               initCategorieInvestClass.libelle= req.body.libelle
                               initCategorieInvestClass.modifDate= req.body.modifDate
                               initCategorieInvestClass.modifUserId= req.body.modifUserId
                               CategorieInvest.updateCategorieInvestInModel(initCategorieInvestClass)
                                     .then(()=> res.status(200).json({succes: "la création a reussi"}))
                                     .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                           }
                           else
                              {
                                res.status(500).json({error: "Le code de cette catégorie existe déjà"})
                              }
                     })
                     .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
            
               }
               else
                  {
                    res.status(500).json({error: "Cette catégorie d'invertissement existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))

}


function getAsingleCategorieInvest(req, res, next){
    const id= req.params.id
    CategorieInvest.getCategorieInvestByIdInModel(id)
        .then(categorieinvest=> res.status(200).json(categorieinvest))
        .catch(error=> res.status(400).json(error))
}  


function getAllCategorieInvests(req,res, next){
    initCategorieInvestClass.estActif= req.body.estActif
    initCategorieInvestClass.debut= req.body.debut
    initCategorieInvestClass.fin= req.body.fin

     CategorieInvest.getAllCategorieInvestInModel(initCategorieInvestClass)
        .then(categorieinvests=> res.status(200).json(categorieinvests))
        .catch(error=> res.status(400).json(error))
}


function deleteCategorieInvest(req, res, next){
    CategorieInvest.deleteCategorieInvestInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "suppression impossible car cet élément est lié à une autre table"}));
}


 
module.exports={
    deleteCategorieInvest,
    disableCategorieInvest,
    addCategorieInvest,
    updateCategorieInvest,
    getAsingleCategorieInvest,
    getAllCategorieInvests
}