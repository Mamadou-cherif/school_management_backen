const Programme= require("../models/programme")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json()) 
const initProgrammeClass= require("../classes/programme")

function addProgramme(req, res,next){

    const objProgramme={
      libelle: req.body.libelle,
      estActif:1
    }
   
     Programme.programmeSelectByInModel(objProgramme)
          .then(programmes=> {
                if(programmes.length==0){
                  const objProgramme={
                    code: req.body.code,
                    estActif:1
                  }
                  Programme.programmeSelectByInModel(objProgramme)
                  .then(uniqueCode=> {
                        if(uniqueCode.length==0){
                            initProgrammeClass.axeId= req.body.axeId
                            initProgrammeClass.code= req.body.code
                            initProgrammeClass.libelle= req.body.libelle
                            initProgrammeClass.description= req.body.description
                            initProgrammeClass.creationUserId= req.body.creationUserId
                            Programme.addProgrammeInModel(initProgrammeClass)
                                  .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée programmes_insert"}));
                        }
                        else
                        {
                             res.status(500).json({error: "Ce code de ce programme existe déjà"})
                        }
                  })
                  .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée programmes_selectBy"}))
        
                }
                else
                {
                     res.status(500).json({error: "Ce programme existe déjà"})
                }
          })
          .catch(()=> res.status(400).json({error: "Erreur de la procedure stockée programmes_selectBy"}))

 }

function disableProgramme(req, res, next){

    const objProgramme={
        id: req.body.id,
        modifUserId: req.body.modifUserId,
        modifDate: req.body.modifDate,
    }
    Programme.disableProgrammeInModel(objProgramme)
        .then(()=> res.status(201).json({succes: "La suppression a reussi"}))
        .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké de suppression"}));
}
 
function updateProgramme(req,res, next){
        
       
    const objDocument={
        libelle : req.body.libelle,
        estActif:1
       }
       
   
    Programme.programmeSelectByInModel(objDocument)
         .then(programme=> {
               if((programme.length==0) || (programme[0].id == req.body.id)){
                const objDocument={
                    code : req.body.code,
                    estActif:1
                   }
                Programme.programmeSelectByInModel(objDocument)
                .then(codes=> {
                      if((codes.length==0) || (codes[0].id == req.body.id)){
                          initProgrammeClass.id= req.body.id
                          initProgrammeClass.axeId= req.body.axeId
                          initProgrammeClass.code = req.body.code 
                          initProgrammeClass.libelle= req.body.libelle
                          initProgrammeClass.description= req.body.description
                          initProgrammeClass.modifDate= req.body.modifDate
                          initProgrammeClass.modifUserId= req.body.modifUserId
                          Programme.updateProgrammeInModel(initProgrammeClass)
                                .then(()=> res.status(200).json({succes: "Modification a reussi"}))
                                .catch(()=> res.status(400).json({error: "Erreur lors de la modification"}));
                      }
                      else
                         {
                           res.status(500).json({error: "Ce code existe déjà"})
                         }
                })
                .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
       
          
               }
               else
                  {
                    res.status(500).json({error: "Ce programme existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleProgramme(req, res, next){
    const id= req.params.id
    Programme.selectByIdProgrammeInModel(id)
        .then(programme=> res.status(200).json(programme))
        .catch(error=> res.status(400).json(error))
}


function getAllProgrammes(req,res, next){
    initProgrammeClass.estActif= req.body.estActif
    initProgrammeClass.debut= req.body.debut
    initProgrammeClass.fin= req.body.fin

     Programme.selectAllProgrammeInModel(initProgrammeClass)
        .then(programmes=> res.status(200).json(programmes))
        .catch(error=> res.status(400).json(error))
}

function programmeSelectBy(req, res, next){
     const objProgramme ={
        id:req.body.id || null,
        axeId:req.body.axeId || null,
        code:req.body.code || null,
        libelle:req.body.libelle || null,
        description:req.body.description || null,
        estActif:1,
        creationDate:req.body.creationDate || null,
        creationUserId:req.body.creationUserId || null,
        modifDate:req.body.modifDate || null,
        modifUserId:req.body.modifUserId || null,
        debutDonnees:req.body.debutDonnees || null,
        finDonnees:req.body.finDonnees || null
     }

    Programme.programmeSelectByInModel(objProgramme)
        .then(programme=> res.status(200).json(programme))
        .catch(error=> res.status(400).json(error))
}

module.exports={
    programmeSelectBy,
    disableProgramme,
    addProgramme,
    updateProgramme,
    getAsingleProgramme,
    getAllProgrammes,
}