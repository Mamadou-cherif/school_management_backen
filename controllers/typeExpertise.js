const typeExpertise= require("../models/typeExpertise")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json())
const initTypeExpertiseClass= require("../classes/typeExpertise")


  function selectAllTypeExpertise(req,res, next){

    typeExpertise.selectAllTypeExpertiseInModel(req)
       .then(typeExpertises=> res.status(200).json(typeExpertises))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdTypeExpertise(req, res, next){
    const id= req.params.id
    typeExpertise.selectByIdTypeExpertiseInModel(id)
    .then(typeExpertise=> res.status(200).json(typeExpertise))
    .catch(error=> res.status(400).json(error))
  }


  function addTypeExpertise(req, res,next){

    const objExpertise={
      libelle: req.body.libelle,
      estActif:1
    }
   
     typeExpertise.typeExpertiseSelectByInModel(objExpertise)
          .then(typeExpertises=> {
                if(typeExpertises.length==0){
                  const objUniqCode={
                    code: req.body.code,
                    estActif:1
                  }
                  typeExpertise.typeExpertiseSelectByInModel(objUniqCode)
                  .then(uniqueCode=> {
                        if(uniqueCode.length==0){
                             initTypeExpertiseClass.libelle = req.body.libelle
                             initTypeExpertiseClass.code= req.body.code
                            initTypeExpertiseClass.creationUserId= req.body.creationUserId
                            typeExpertise.addTypeExpertiseInModel(initTypeExpertiseClass)
                                  .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_insert"}));
                        }
                        else
                        {
                             res.status(500).json({error: "Ce code de ce type expertise existe déjà"})
                        }
                  })
                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_selectBy"}))
        
                }
                else
                {
                     res.status(500).json({error: "Ce type expertise existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_selectBy"}))

        }


function updateTypeExpertise(req, res,next){
    
  const objExpertise={
    libelle: req.body.libelle,
    estActif:1
  } 
     typeExpertise.typeExpertiseSelectByInModel(objExpertise)
          .then(typeExpertises=> {
              if((typeExpertises.length==0) || (typeExpertises[0].id== req.body.id)){
                const objCode={
                  code: req.body.code,
                  estActif:1
                } 
                   typeExpertise.typeExpertiseSelectByInModel(objCode)
                        .then(codes=> {
                            if((codes.length==0) || (codes[0].id== req.body.id)){
                                initTypeExpertiseClass.id= req.body.id
                                 initTypeExpertiseClass.libelle = req.body.libelle
                                initTypeExpertiseClass.code= req.body.code
                                initTypeExpertiseClass.modifUserId= req.body.modifUserId
                                initTypeExpertiseClass.modifDate= req.body.modifDate
                                typeExpertise.updateTypeExpertiseInModel(initTypeExpertiseClass)
                                      .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                                      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_update"}));
                            }
                            else
                            {
                                 res.status(500).json({error: "Ce code de ce type expertise existe déjà"})
                            }
                      })
                      .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_selectBy"}))
              
              }
              else
              {
                   res.status(500).json({error: "Ce type expertise existe déjà"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typeexpertises_selectBy"}))

}


//supression logique d'un axe
function deleteTypeExpertise(req, res, next){
  typeExpertise.deleteTypeExpertiseInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car ce type expertise est dans une autre table"}));
}
 

  module.exports={
    selectAllTypeExpertise,
    selectByIdTypeExpertise,
    addTypeExpertise,
    updateTypeExpertise,
    deleteTypeExpertise
  }