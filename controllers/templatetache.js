const TemplateTache = require("../models/templatetache")
 
    

function addTemplateTache(req, res,next){
    const objTemplateTache={
        templateId: req.body.templateId ,
        ordre: req.body.ordre ,
        estActif:1
    }
    TemplateTache.templatetacheSelectByInModel(objTemplateTache)
        .then(templatetache=> {
            // Si cet ordre n'existe pas, on insère quand même
            if((templatetache.length==0)){
                const objTemplateTache={
                    templateId: req.body.templateId ,
                    tacheId: req.body.tacheId ,
                    estActif:1
                  }
                   TemplateTache.templatetacheSelectByInModel(objTemplateTache)
                        .then(templatetache=> {
                        if((templatetache.length==0)){
                            const templatetacheObj={
                                templateId: req.body.templateId ,
                                tacheId: req.body.tacheId ,
                                ordre: req.body.ordre,
                                creationUserId: req.body.creationUserId,
                            }
                        TemplateTache.addTemplateTacheInModel(templatetacheObj)
                            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                                                    
                        }
                    else
                        {
                        res.status(500).json({error: "Dupplicata de cette tâche pour ce template"})
                        }
                        })
                        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                    
            }
            else
            {   
                // Modification des ordres des taches sur le template
                const templateTacheObj={
                    templateId: req.body.templateId ,
                    ordrePrecedent : req.body.ordrePrecedent, 
                    estActif:1
                }
                /* Cette function appelle la procédure qui permet d'incrementer 
                 Tout ordre du template supérieur à l'ordre de la ligne ajoutée */
                updateGreaterThanCurentOrdre(templateTacheObj)

                const objTemplateTache={
                    templateId: req.body.templateId ,
                    tacheId: req.body.tacheId,
                    estActif:1
                  }
                   TemplateTache.templatetacheSelectByInModel(objTemplateTache)
                        .then(templatetache=> {
                        if((templatetache.length==0)){
                            const templatetacheObj={
                                templateId: req.body.templateId ,
                                tacheId: req.body.tacheId ,
                                ordre: req.body.ordre,
                                creationUserId: req.body.creationUserId,
                            }
                        TemplateTache.addTemplateTacheInModel(templatetacheObj)
                            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                                                    
                        }
                    else
                        {
                        res.status(500).json({error: "Dupplicata de cette tâche pour ce template"})
                        }
                        })
                        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                    
            }
        })
        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   }



function templatetacheSelectBy(req, res, next){
    const templatetacheObj={
        id: req.body.id || null,
        templateId: req.body.templateId || null,
        tacheId: req.body.tacheId || null,
        ordre: req.body.ordre || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
    }

    TemplateTache.templatetacheSelectByInModel(templatetacheObj)
        .then(templatetache=> res.status(200).json(templatetache))
        .catch(error=> res.status(400).json(error))
}





function updateGreaterThanCurentOrdre(data){
    TemplateTache.updateGreaterThanCurentOrdreInModel(data)
        .then(()=>{})
        .catch(()=>{})
}

// 
function updateTemplateTache(req,res, next){
    const objTemplateTache={
        templateId: req.body.templateId ,
        ordre: req.body.ordre ,
        estActif:1
    }
    TemplateTache.templatetacheSelectByInModel(objTemplateTache)
        .then(templatetache=> {
            if((templatetache.length==0) || (templatetache[0].id == req.body.id)){
                const objTemplateTache2={
                    templateId: req.body.templateId ,
                    tacheId: req.body.tacheId ,
                    estActif:1
                  }
                   TemplateTache.templatetacheSelectByInModel(objTemplateTache2)
                        .then(templatetache=> {
                        if((templatetache.length==0) || (templatetache[0].id == req.body.id)){
                            const templatetacheObj={
                                id: req.body.id,
                                templateId: req.body.templateId ,
                                tacheId: req.body.tacheId ,
                                ordre: req.body.ordre,
                                modifDate: req.body.modifDate,
                                modifUserId: req.body.modifUserId,
                            }
                            
                                TemplateTache.updateTemplateTacheInModel(templatetacheObj)
                                    .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                                    .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                                                       
                        }
                    else
                        {
                        res.status(500).json({error: "Dupplicata de cette tâche pour ce template"})
                        }
                        })
                        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                    
            }
            else
                {
                res.status(500).json({error: "Cet ordre existe déjà pour ce template"})
                }
        })
        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

        }

//supression logique d'un templatetache
function disableTemplateTache(req, res, next) {
 const templatetacheObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    TemplateTache.disableTemplateTacheInModel(templatetacheObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleTemplateTache(req, res, next) {
    const id = req.params.id
    TemplateTache.getTemplateTacheByIdInModel(id)
        .then(templatetache => res.status(200).json(templatetache))
        .catch(error => res.status(400).json(error))
}


function selectNextTache(req, res, next) {
    const templatetacheObj={
        templateId: req.body.templateId,
        ordre: req.body.ordre,
        estActif: 1

    }
    TemplateTache.selectNextTacheInModel(templatetacheObj)
        .then(templatetache => res.status(200).json(templatetache))
        .catch(error => res.status(400).json(error))
    }

    function selectGrethanCurentOrdre(req, res, next) {
        const templatetacheObj={
            templateId: req.body.templateId,
            ordre: req.body.ordre,
            estActif: 1
    
        }
        TemplateTache.selectGrethanCurentOrdreInModel(templatetacheObj)
            .then(templatetache => res.status(200).json(templatetache))
            .catch(error => res.status(400).json(error))
        }

    function selectLastTache(req, res, next) {
        const templatetacheObj={
            idLigne: req.body.idLigne,
        }
        TemplateTache.selectLastTacheInModel(templatetacheObj)
            .then(templatetache => res.status(200).json(templatetache))
            .catch(error => res.status(400).json(error))
        }

        function selectLastTache(req, res, next) {
            const templatetacheObj={
                ordre: req.body.ordre,
                templateId: req.body.templateId,
            }
            TemplateTache.selectLastTacheInModel(templatetacheObj)
                .then(templatetache => res.status(200).json(templatetache))
                .catch(error => res.status(400).json(error))
            }

    function selectFirstTache(req, res, next) {
        const templatetacheObj={
            activiteId: req.body.activiteId,
            estActif: 1
        }
        TemplateTache.selectFirstTacheInModel(templatetacheObj)
            .then(templatetache => res.status(200).json(templatetache))
            .catch(error => res.status(400).json(error))
        }
        
function selectLastAffecteByActiviteId(req, res, next) {
    const templatetacheObj={
        activiteId: req.body.activiteId,
        estActif: 1

    }
    TemplateTache.selectLastAffecteByActiviteIdInModel(templatetacheObj)
        .then(templatetache => res.status(200).json(templatetache))
        .catch(error => res.status(400).json(error))
    }

    function selectTemplateTacheNotAffectedActivite(req, res, next) {
        const templatetacheObj={
            templateId: req.body.templateId,
            activiteId: req.body.activiteId,
            estActif: 1
    
        }
        TemplateTache.selectTemplateTacheNotAffectedActiviteInModel(templatetacheObj)
            .then(templatetache => res.status(200).json(templatetache))
            .catch(error => res.status(400).json(error))
        }

function getAllTemplateTache(req, res, next) {
    TemplateTache.getAllTemplateTacheInModel()
        .then(templatetache => res.status(200).json(templatetache))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableTemplateTache,
    selectLastAffecteByActiviteId,
    selectTemplateTacheNotAffectedActivite,
    selectNextTache,
    selectFirstTache,
    addTemplateTache,
    updateTemplateTache,
    selectGrethanCurentOrdre,
    getAsingleTemplateTache,
    getAllTemplateTache,
    selectLastTache,
    templatetacheSelectBy
}