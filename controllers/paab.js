const Paab = require("../models/paab")

 
function addPaab(req, res,next){
        const paabObj={
            papbId: req.body.papbId,
            libelle: req.body.libelle,
            debut: req.body.debut,
            fin: req.body.fin,
            observations: req.body.observations,
            creationUserId: req.body.creationUserId,
    }
          Paab.addPaabInModel(paabObj)
              .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
              .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
    
    // const objPaab={
    //     papbId: req.body.papbId,
    //     libelle: req.body.libelle,
    //     estActif:1
    // }

    //  Paab.paabSelectByInModel(objPaab)
    //       .then(paab=> {
    //         console.log(paab)

    //             if(paab.length==0){
    //                 const paabObj={
    //                     papbId: req.body.papbId,
    //                     libelle: req.body.libelle,
    //                     debut: req.body.debut,
    //                     fin: req.body.fin,
    //                     observations: req.body.observations,
    //                     creationUserId: req.body.creationUserId,
    //             }
    //                   Paab.addPaabInModel(paabObj)
    //                       .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
    //                       .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
    //             }
    //             else
    //                {
    //                  res.status(500).json({error: "Cette paab existe déjà pour ce projet"})
    //                }
    //       })
    //       .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function paabSelectBy(req, res, next){
    const paabObj={
        id: req.body.id || null,
        papbId: req.body.papbId || null,
        libelle: req.body.libelle || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
    }
    Paab.paabSelectByInModel(paabObj)
        .then(paab=> res.status(200).json(paab))
        .catch(error=> res.status(400).json(error))

}







 
function updatePaab(req,res, next){
                         
    const paabObj={
        id: req.body.id,
        papbId: req.body.papbId,
        libelle: req.body.libelle,
        debut: req.body.debut,
        fin: req.body.fin,
        observations: req.body.observations,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}

      Paab.updatePaabInModel(paabObj)
          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
  
        }

//supression logique d'un paab
function disablePaab(req, res, next) {
 const paabObj={
        id: req.body.id,
       modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Paab.disablePaabInModel(paabObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsinglePaab(req, res, next) {
    const id = req.params.id
    Paab.getPaabByIdInModel(id)
        .then(paab => res.status(200).json(paab))
        .catch(error => res.status(400).json(error))
}


function getAllPaabs(req, res, next) {
    Paab.getAllPaabInModel()
        .then(paab => res.status(200).json(paab))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disablePaab,
    addPaab,
    updatePaab,
    getAsinglePaab,
    getAllPaabs,
    paabSelectBy
}