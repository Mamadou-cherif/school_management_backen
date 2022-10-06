const TemplateTache = require("../models/templatetache")
 
function addTemplateTache(req, res,next){
//     const objTemplateTache={
//         code: req.body.code,
//         estActif:1
//     }
//     TemplateTache.templatetacheSelectByInModel(objTemplateTache)
// .then(templatetache=> {
//       if((templatetache.length==0)){
//           const objTemplateTache={
//               libelle: req.body.libelle,
//               estActif:1
// //           }
         
//            TemplateTache.templatetacheSelectByInModel(objTemplateTache)
//                 .then(templatetache=> {
//                       if((templatetache.length==0)){
    const templatetacheObj={
        templateId: req.body.templateId ,
        tacheId: req.body.tacheId ,
        ordre: req.body.ordre,
        creationUserId: req.body.creationUserId,
    }
        TemplateTache.addTemplateTacheInModel(templatetacheObj)
            .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                        
//                       }
//                       else
//                          {
//                            res.status(500).json({error: "Ce libellé existe déjà pour cette templatetache"})
//                          }
//                 })
//                 .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
            
//       }
//       else
//          {
//            res.status(500).json({error: "Ce code existe déjà pour cette tâche"})
//          }
// })
// .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

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







 
function updateTemplateTache(req,res, next){
        
    // const objTemplateTache={
    //     libelle: req.body.libelle,
    //     estActif:1
    // }
   
    //  TemplateTache.templatetacheSelectByInModel(objTemplateTache)
    //       .then(templatetache=> {
    //             if((templatetache.length==0) || (templatetache[0].id == req.body.id)){
    //                 const objTemplateTache={
    //                     code: req.body.activiteId,
    //                     estActif:1
    //                 }
                   
    //                  TemplateTache.templatetacheSelectByInModel(objTemplateTache)
    //                       .then(templatetache=> {
    //                             if((templatetache.length==0) || (templatetache[0].id == req.body.id)){
                                         
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
               
        //                         }
        //                         else
        //                            {
        //                              res.status(500).json({error: "Ce code existe déjà pour cette templatetache"})
        //                            }
        //                   })
        //                   .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
                      
        //         }
        //         else
        //            {
        //              res.status(500).json({error: "Ce libellé existe déjà pour cette tâche"})
        //            }
        //   })
        //   .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
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


function getAllTemplateTache(req, res, next) {
    TemplateTache.getAllTemplateTacheInModel()
        .then(templatetache => res.status(200).json(templatetache))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableTemplateTache,
    addTemplateTache,
    updateTemplateTache,
    getAsingleTemplateTache,
    getAllTemplateTache,
    templatetacheSelectBy
}