const typeDocument= require("../models/typeDocument")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json())
const initTypeDocumentClass= require("../classes/typeDocument")


  function selectAllTypeDocument(req,res, next){

    typeDocument.selectAllTypeDocumentInModel(req)
       .then(typeDocuments=> res.status(200).json(typeDocuments))
       .catch(error=> res.status(400).json(error))
  }

  function selectByIdTypeDocument(req, res, next){
    const id= req.params.id
    typeDocument.selectByIdTypeDocumentInModel(id)
    .then(typeDocument=> res.status(200).json(typeDocument))
    .catch(error=> res.status(400).json(error))
  }


  function addTypeDocument(req, res,next){

    const objTDocument={
      libelle: req.body.libelle,
      categorie: req.body.categorie,
      estActif:1
    }
     
     typeDocument.typeDocumentSelectByInModel(objTDocument)
          .then(typeDocuments=> {
                if(typeDocuments.length == 0){
                  initTypeDocumentClass.libelle = req.body.libelle
                  initTypeDocumentClass.categorie= req.body.categorie
                    initTypeDocumentClass.creationUserId= req.body.creationUserId
                    typeDocument.addTypeDocumentInModel(initTypeDocumentClass)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typedocuments_insert"}));
                }
                else
                {
                     res.status(500).json({error: "Cette categorie a déjà ce type de document"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typedocuments_selectBy"}))
}


function updateTypeDocument(req, res,next){
  const objTDocument={
    libelle: req.body.libelle,
    categorie: req.body.categorie,
    estActif:1
  }
  
   //verifie si cette categorie à ce type document
   typeDocument.typeDocumentSelectByInModel(objTDocument)
        .then(typeDocuments=> {
              if((typeDocuments.length==0) || (typeDocuments[0].id== req.body.id)){
                  initTypeDocumentClass.id= req.body.id
                  initTypeDocumentClass.libelle= req.body.libelle
                  initTypeDocumentClass.categorie= req.body.categorie
                  initTypeDocumentClass.modifUserId= req.body.modifUserId
                  initTypeDocumentClass.modifDate= req.body.modifDate
                  typeDocument.updateTypeDocumentInModel(initTypeDocumentClass)
                        .then(()=> res.status(201).json({succes: "Modification effectuée avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typedocuments_update"}));
              }
              else
              {
                   res.status(500).json({error: "Cette categorie a déjà ce type de document"})
              }
        })
        .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée typedocuments_selectBy"}))
}


//supression logique d'un type document
function deleteTypeDocument(req, res, next){
  typeDocument.deleteTypeDocumentInModel(req.params.id)
    .then(()=> res.status(201).json({succes: "Suppression effectuée avec succès"}))
    .catch(()=> res.status(400).json({error: "Suppression impossible car ce type de document est dans une autre table"}));
}
 

  module.exports={
    selectAllTypeDocument,
    selectByIdTypeDocument,
    addTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
  }