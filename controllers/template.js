const Template = require("../models/template")

 
function addTemplate(req, res,next){
    const objTemplate={
        libelle: req.body.libelle,
        estActif:1
    }
    
     Template.templateSelectByInModel(objTemplate)
          .then(template=> {
                if((template.length==0)){
                    const templateObj={
                        id: req.body.id,
                        libelle: req.body.libelle,
                        creationUserId: req.body.creationUserId,
                    }
                    Template.addTemplateInModel(templateObj)
                        .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                }
                else
                   {
                     res.status(500).json({error: "Cette template existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
}



function templateSelectBy(req, res, next){
    const templateObj={
        id: req.body.id || null,
        libelle: req.body.libelle || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    Template.templateSelectByInModel(templateObj)
        .then(template=> res.status(200).json(template))
        .catch(error=> res.status(400).json(error))

}







 
function updateTemplate(req,res, next){
        
    const objTemplate={
        libelle: req.body.libelle,
        estActif:1
    }
   
     Template.templateSelectByInModel(objTemplate)
          .then(template=> {
                if((template.length==0) || (template[0].id == req.body.id)){
                    const objTemplate={
                        code: req.body.code,
                        estActif:1
                    }
                   
                    const templateObj={
                        id: req.body.id,
                        libelle: req.body.libelle,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                    }
                    
                      Template.updateTemplateInModel(templateObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                }
                else
                   {
                     res.status(500).json({error: "Ce template existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'une template
function disableTemplate(req, res, next) {
 const templateObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Template.disableTemplateInModel(templateObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function deleteTemplate(req, res, next) {
    const id = req.params.id
    Template.deleteTemplateInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(error => res.status(400).json(error))
}


function getAsingleTemplate(req, res, next) {
    const id = req.params.id
    Template.getTemplateByIdInModel(id)
        .then(template => res.status(200).json(template))
        .catch(error => res.status(400).json(error))
}


function getAllTemplate(req, res, next) {
    Template.getAllTemplateInModel()
        .then(template => res.status(200).json(template))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableTemplate,
    addTemplate,
    updateTemplate,
    getAsingleTemplate,
    getAllTemplate,
    deleteTemplate,
    templateSelectBy
}