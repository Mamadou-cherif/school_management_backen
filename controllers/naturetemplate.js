const NatureTemplate = require("../models/naturetemplate")

 
function addNatureTemplate(req, res,next){
    const objNatureTemplate={
        natureId: req.body.natureId,
        templateId: req.body.templateId,
        estActif:1
    }
    
     NatureTemplate.naturetemplateSelectByInModel(objNatureTemplate)
          .then(naturetemplate=> {
                if((naturetemplate.length==0)){
                    const naturetemplateObj={
                        id: req.body.id,
                        natureId: req.body.natureId,
                        templateId: req.body.templateId ,
                        creationUserId: req.body.creationUserId,
                    }
                      NatureTemplate.addNatureTemplateInModel(naturetemplateObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                }
                else
                   {
                     res.status(500).json({error: "Cette nature existe déjà pour ce template"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
}



function naturetemplateSelectBy(req, res, next){
    const naturetemplateObj={
        id: req.body.id || null,
        templateId: req.body.templateId || null,
        natureId: req.body.natureId || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    NatureTemplate.naturetemplateSelectByInModel(naturetemplateObj)
        .then(naturetemplate=> res.status(200).json(naturetemplate))
        .catch(error=> res.status(400).json(error))

}
 
function updateNatureTemplate(req,res, next){
        
    const objNatureTemplate={
        templateId: req.body.templateId,
        natureId: req.body.natureId,
        estActif:1
    }
   
     NatureTemplate.naturetemplateSelectByInModel(objNatureTemplate)
          .then(naturetemplate=> {
                if((naturetemplate.length==0) || (naturetemplate[0].id == req.body.id)){
                    
                    const naturetemplateObj={
                        id: req.body.id,
                        templateId: req.body.templateId,
                        natureId: req.body.natureId,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                    }
                    
                      NatureTemplate.updateNatureTemplateInModel(naturetemplateObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                    
                }
                else
                   {
                     res.status(500).json({error: "Cette nature existe déjà pour ce template"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'une naturetemplate
function disableNatureTemplate(req, res, next) {
 const naturetemplateObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    NatureTemplate.disableNatureTemplateInModel(naturetemplateObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function deleteNatureTemplate(req, res, next) {
    const id = req.params.id
    NatureTemplate.deleteNatureTemplateInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(error => res.status(400).json(error))
}


function getAsingleNatureTemplate(req, res, next) {
    const id = req.params.id
    NatureTemplate.getNatureTemplateByIdInModel(id)
        .then(naturetemplate => res.status(200).json(naturetemplate))
        .catch(error => res.status(400).json(error))
}


function getAllNatureTemplate(req, res, next) {
    NatureTemplate.getAllNatureTemplateInModel()
        .then(naturetemplate => res.status(200).json(naturetemplate))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableNatureTemplate,
    addNatureTemplate,
    updateNatureTemplate,
    getAsingleNatureTemplate,
    getAllNatureTemplate,
    deleteNatureTemplate,
    naturetemplateSelectBy
}