const Nature = require("../models/nature")

 
function addNature(req, res,next){
    const objNature={
        libelle: req.body.libelle,
        estActif:1
    }
    
     Nature.natureSelectByInModel(objNature)
          .then(nature=> {
                if((nature.length==0)){
                    const objNature={
                        code: req.body.code,
                        estActif:1
                    }
                   
                     Nature.natureSelectByInModel(objNature)
                          .then(nature=> {
                                if((nature.length==0)){
                                    const natureObj={
                                        id: req.body.id,
                                        code: req.body.code,
                                        libelle: req.body.libelle,
                                        creationUserId: req.body.creationUserId,
                                        
                                    }
                                    
                                      Nature.addNatureInModel(natureObj)
                                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                                    
                                }
                                else
                                   {
                                     res.status(500).json({error: "Cette nature existe déjà pour ce projet"})
                                   }
                          })
                          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                      
                }
                else
                   {
                     res.status(500).json({error: "Cette nature existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
}



function natureSelectBy(req, res, next){
    const natureObj={
        id: req.body.id || null,
        libelle: req.body.libelle || null,
        code: req.body.code || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    Nature.natureSelectByInModel(natureObj)
        .then(nature=> res.status(200).json(nature))
        .catch(error=> res.status(400).json(error))

}







 
function updateNature(req,res, next){
        
    const objNature={
        libelle: req.body.libelle,
        estActif:1
    }
   
     Nature.natureSelectByInModel(objNature)
          .then(nature=> {
                if((nature.length==0) || (nature[0].id == req.body.id)){
                    const objNature={
                        code: req.body.code,
                        estActif:1
                    }
                   
                     Nature.natureSelectByInModel(objNature)
                          .then(nature=> {
                                if((nature.length==0) || (nature[0].id == req.body.id)){
                                    const natureObj={
                                        id: req.body.id,
                                        libelle: req.body.libelle,
                                        code: req.body.code,
                                        modifDate: req.body.modifDate,
                                        modifUserId: req.body.modifUserId,
                                    }
                                    
                                      Nature.updateNatureInModel(natureObj)
                                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                                    
                                }
                                else
                                   {
                                     res.status(500).json({error: "Cette nature existe déjà pour ce projet"})
                                   }
                          })
                          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                      
                }
                else
                   {
                     res.status(500).json({error: "Cette nature existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'une nature
function disableNature(req, res, next) {
 const natureObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Nature.disableNatureInModel(natureObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function deleteNature(req, res, next) {
    const id = req.params.id
    Nature.deleteNatureInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(error => res.status(400).json(error))
}


function getAsingleNature(req, res, next) {
    const id = req.params.id
    Nature.getNatureByIdInModel(id)
        .then(nature => res.status(200).json(nature))
        .catch(error => res.status(400).json(error))
}


function getAllNature(req, res, next) {
    Nature.getAllNatureInModel()
        .then(nature => res.status(200).json(nature))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableNature,
    addNature,
    updateNature,
    getAsingleNature,
    getAllNature,
    deleteNature,
    natureSelectBy
}