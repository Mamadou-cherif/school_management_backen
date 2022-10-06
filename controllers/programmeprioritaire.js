const Pgprioritaire = require("../models/programmeprioritaire")
const crypto = require('crypto');
const multersd = require('multer')
const path = require('path');
const fs = require("fs")

let documentUrl = '';
const storage = multersd.diskStorage({
    destination: './uploads/programmes_prioritaires/',
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
      res.status(400).send(err)
    }
  }

  function getImageFile(req, res) {

    var image_file = req.params.File;
    var path_file = './uploads/programmes_prioritaires/' + image_file;
    fs.exists(path_file, (exists) => {
      if (exists) {
        res.sendFile(path.resolve(path_file));
      }
    });
  }

function addPgprioritaire(req, res,next){
    const objPgprioritaire={
        prograGleId: req.body.prograGleId,
        libelle: req.body.libelle,
        estActif:1
    }
     Pgprioritaire.programmesprioritairesSelectByInModel(objPgprioritaire)
          .then(programmesprioritaire=> {
                if(programmesprioritaire.length==0){
                    const programmesprioritairesObj={
                        prograGleId: req.body.prograGleId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        copie: documentUrl,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Pgprioritaire.addPgprioritaireInModel(programmesprioritairesObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette programmesprioritaire existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function programmesprioritairesSelectBy(req, res, next){
    const programmesprioritairesObj={
        id: req.body.id || null,
        prograGleId: req.body.prograGleId || null,
        numero: req.body.numero || null,
        libelle: req.body.libelle || null,
        copie: req.body.copie || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    Pgprioritaire.programmesprioritairesSelectByInModel(programmesprioritairesObj)
        .then(programmesprioritaire=> res.status(200).json(programmesprioritaire))
        .catch(error=> res.status(400).json(error))

}







 
function updatePgprioritaire(req,res, next){
        
    const objPgprioritaire={
        projetId: req.body.projetId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Pgprioritaire.programmesprioritairesSelectByInModel(objPgprioritaire)
          .then(programmesprioritaire=> {
                if((programmesprioritaire.length==0) || (programmesprioritaire[0].id == req.body.id)){
                    if(req.body.newfile==false){
                      documentUrl=req.body.copie
                    }
                    const programmesprioritairesObj={
                        id: req.body.id,
                        prograGleId: req.body.prograGleId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        copie: documentUrl,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Pgprioritaire.updatePgprioritaireInModel(programmesprioritairesObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette programmesprioritaire existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un programmesprioritaire
function disablePgprioritaire(req, res, next) {
 const programmesprioritairesObj={
        id: req.body.id,
       modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Pgprioritaire.disablePgprioritaireInModel(programmesprioritairesObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsinglePgprioritaire(req, res, next) {
    const id = req.params.id
    Pgprioritaire.getPgprioritaireByIdInModel(id)
        .then(programmesprioritaire => res.status(200).json(programmesprioritaire))
        .catch(error => res.status(400).json(error))
}


function getAllPgprioritaires(req, res, next) {
    Pgprioritaire.getAllPgprioritaireInModel()
        .then(programmesprioritaires => res.status(200).json(programmesprioritaires))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    files,
    getImageFile,
    disablePgprioritaire,
    addPgprioritaire,
    updatePgprioritaire,
    getAsinglePgprioritaire,
    getAllPgprioritaires,
    programmesprioritairesSelectBy
}