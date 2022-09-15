const ActiviteProjet = require("../models/activiteprojet")
const crypto = require('crypto');
const multersd = require('multer')
const path = require('path');
const fs = require("fs")
 
let documentUrl = '';


const storage = multersd.diskStorage({
    destination: './uploads/projet/',
    filename: function (req, file, callback) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return callback(err);
        let derniereImage = raw.toString('hex') + path.extname(file.originalname);
        callback(null, derniereImage);
      })
    }
  })

  
const upload = multersd({ storage: storage });

const singleUpload = upload.single('image');

function files(req, res, next) {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
      }
      if (!req.file.originalname.match(/\.(docx|pdf)$/)) {
        return res.status(400).json({ error: 'only  autorized' })
      }
      documentUrl = req.file.filename;


      return res.json({ 'imageUrl': documentUrl });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
}


function addActiviteProjet(req, res,next){
    const objActiviteProjet={
        projetId: req.body.projetId,
        activiteId: req.body.activiteId,
        reference: req.body.reference,
        estActif:1
    }
     ActiviteProjet.activiteprojetSelectByInModel(objActiviteProjet)
          .then(activiteprojet=> {
                if(activiteprojet.length==0){
                    const activiteprojetObj={
                        projetId: req.body.projetId,
                        activiteId: req.body.activiteId,
                        reference: req.body.reference,
                        debut: req.body.debut,
                        fin: req.body.fin,
                        copie: req.body.copie,
                        renouvelerId: req.body.renouvelerId || null,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      ActiviteProjet.addActiviteProjetInModel(activiteprojetObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette activiteprojet existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function activiteprojetSelectBy(req, res, next){
    const activiteprojetObj={
        id: req.body.id || null,
        projetId: req.body.projetId|| null,
        activiteId: req.body.activiteId|| null,
        reference: req.body.reference|| null,
        debut: req.body.debut|| null,
        fin: req.body.fin|| null,
        copie: req.body.copie|| null,
        renouvelerId: req.body.renouvelerId || null,
        observations: req.body.observations,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    ActiviteProjet.activiteprojetSelectByInModel(activiteprojetObj)
        .then(activiteprojet=> res.status(200).json(activiteprojet))
        .catch(error=> res.status(400).json(error))

}

function updateActiviteProjet(req,res, next){
        
    const objActiviteProjet={
        projetId: req.body.projetId,
        activiteId: req.body.activiteId,
        reference: req.body.reference,
        estActif:1
    }
   
     ActiviteProjet.activiteprojetSelectByInModel(objActiviteProjet)
          .then(activiteprojet=> {
                if((activiteprojet.length==0) || (activiteprojet[0].id == req.body.id)){
                    
                    const activiteprojetObj={
                        id: req.body.id,
                        projetId: req.body.projetId,
                        activiteId: req.body.activiteId,
                        reference: req.body.reference,
                        debut: req.body.debut,
                        fin: req.body.fin,
                        copie: req.body.copie,
                        renouvelerId: req.body.renouvelerId || null,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      ActiviteProjet.updateActiviteProjetInModel(activiteprojetObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette activiteprojet existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un activiteprojet
function disableActiviteProjet(req, res, next) {
 const activiteprojetObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    ActiviteProjet.disableActiviteProjetInModel(activiteprojetObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}


function getAsingleActiviteProjet(req, res, next) {
    const id = req.params.id
    ActiviteProjet.getActiviteProjetByIdInModel(id)
        .then(activiteprojet => res.status(200).json(activiteprojet))
        .catch(error => res.status(400).json(error))
}


function getAllActiviteProjet(req, res, next) {
    ActiviteProjet.getAllActiviteProjetInModel()
        .then(activiteprojet => res.status(200).json(activiteprojet))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    files,
    disableActiviteProjet,
    addActiviteProjet,
    updateActiviteProjet,
    getAsingleActiviteProjet,
    getAllActiviteProjet,
    activiteprojetSelectBy
}