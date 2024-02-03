const StatutProjet= require("../models/statutprojet")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
app.use(bodyParser.json()) 
const initStatutProjetClass= require("../classes/statutprojet")


function addStatutProjet(req, res,next){
    const statutprojet={
        libelle: req.body.libelle,
        estActif: 1,
    }
       
     StatutProjet.checkIfStatutProjetExists(statutprojet)
          .then(statutprojet=> {
                if(statutprojet.length==0){
                    initStatutProjetClass.libelle= req.body.libelle
                    initStatutProjetClass.observations= req.body.observations                  
                    initStatutProjetClass.creationUserId= req.body.creationUserId

                    StatutProjet.addStatutProjetInModel(initStatutProjetClass)
                        .then(()=> res.status(201).json({succes: "la création a reussi"}))
                        .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                
                  
                }
                else
                   {
                     res.status(500).json({error: "Le libellé saisi est déjà rattaché à un autre statut"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}

//supression logique d'un statutprojet
function disableStatutProjet(req, res, next){
    initStatutProjetClass.id= req.body.id
    initStatutProjetClass.modifUserId= req.body.modifUserId
    initStatutProjetClass.modifDate= req.body.modifDate

    StatutProjet.disableStatutProjetInModel(initStatutProjetClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateStatutProjet(req,res, next){
    const statutprojetObj={
        id: null,
        libelle: req.body.libelle,
        estActif: 1,
    }
              
    StatutProjet.checkIfStatutProjetExists(statutprojetObj)
         .then(statutprojet=> {
               if((statutprojet.length==0) || (statutprojet[0].id== req.body.id)){
                initStatutProjetClass.id= req.body.id
                initStatutProjetClass.libelle= req.body.libelle
                initStatutProjetClass.libelle= req.body.libelle
                initStatutProjetClass.observations= req.body.observations                  
                initStatutProjetClass.modifDate= req.body.modifDate
                initStatutProjetClass.modifUserId= req.body.modifUserId
          
                   StatutProjet.updateStatutProjetInModel(initStatutProjetClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
               else
                  {
                    res.status(500).json({error: "cet statut existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleStatutProjet(req, res, next){
    const id= req.params.id
    StatutProjet.getStatutProjetByIdInModel(id)
        .then(statutprojet=> res.status(200).json(statutprojet))
        .catch(error=> res.status(400).json(error))
}

//supression logique d'un axe
function deleteStatutProjet(req, res, next) {
    StatutProjet.deleteStatutProjetInModel(req.params.id)
      .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
      .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
  }
  

function getAllStatutProjets(req,res, next){
    

     StatutProjet.getAllStatutProjetInModel()
        .then(statutprojets=> res.status(200).json(statutprojets))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    deleteStatutProjet,
    disableStatutProjet,
    addStatutProjet,
    updateStatutProjet,
    getAsingleStatutProjet,
    getAllStatutProjets,
}