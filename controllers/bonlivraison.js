const BonLivraison = require("../models/bonlivraison")
const crypto = require('crypto');
const multersd = require('multer')
const path = require('path');
const fs = require("fs")

let linkedFile = '';

const storage = multersd.diskStorage({
  destination: './uploads/bonLivraison/',
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
        return res.status(422).send({ error: [{ title: 'File Upload Error', detail: err.message }] });
      }
      if (!req.file.originalname.match(/\.(docx|pdf|ppt|jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
        return res.status(400).json({ error: 'only  autorized' })
      }
      linkedFile = req.file.filename;

      return res.json({ 'fileUrl': linkedFile });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
}

function bonlivraisonSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        contratId: req.body.contratId || null,
        flotteId: req.body.flotteId || null,
        camionId: req.body.camionId || null,
        chauffeurId: req.body.chauffeurId || null,
        trajetId: req.body.trajetId || null,
        equipeId: req.body.equipeId || null,
        numeroBl: req.body.numeroBl || null,
        dateChargement: req.body.dateChargement || null,
        heure: req.body.heure || null,
        poidsChargee: req.body.poidsChargee || null,
        poidsVide: req.body.poidsVide || null,
        tonnageSurBon: req.body.tonnageSurBon || null,
        distanceMine: req.body.distanceMine || null,
        statutBon: req.body.statutBon || null,
        Observations: req.body.Observations || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
BonLivraison.bonlivraisonSelectByInModel(obj)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json({ error }))
}


function selectAllBonLivraison(req, res, next) {

    BonLivraison.selectAllBonLivraisonInModel(req)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}


function getPointageToExportByDay(req, res, next) {
  const obj={
    dateChargement: req.body.dateChargement
  }
  BonLivraison.getPointageToExportByDay(obj)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}

function getPointageToEexportToExcel(req, res, next) {

  BonLivraison.getPointageToEexportToExcel()
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}
function selectByIdBonLivraison(req, res, next) {
  const id = req.params.id
  BonLivraison.selectByIdBonLivraisonInModel(id)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}


function addBonLivraison(req, res, next) {
    const obj={
      numeroBl: req.body.numeroBl,
        estActif:1,
    }

console.log(linkedFile)

  BonLivraison.bonlivraisonSelectByInModel(obj)
    .then(bonlivraison => {
      if (bonlivraison.length == 0) {
        const bonlivraisonObj = {
          contratId: req.body.contratId,
          flotteId: req.body.flotteId,
          camionId: req.body.camionId,
          chauffeurId: req.body.chauffeurId,
          trajetId: req.body.trajetId,
          equipeId: req.body.equipeId,
          files: linkedFile,
          numeroBl: req.body.numeroBl,
          dateChargement: req.body.dateChargement,
          heure: req.body.heure,
          poidsChargee: req.body.poidsChargee,
          poidsVide: req.body.poidsVide,
          tonnageSurBon: req.body.tonnageSurBon,
          statutBon: req.body.statutBon,
          distanceMine: req.body.distanceMine,
          Observations: req.body.Observations,
          creationUserId: req.body.creationUserId,
        }
       
        BonLivraison.addBonLivraisonInModel(bonlivraisonObj)
        .then(() => res.status(201).json({succes: "ajout réussi"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_insert" }));
      
      }
      else {
        res.status(500).json({ error: "Dupplicatat du numero de bon saisi" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_selectBy" }))
  }


function updateBonLivraison(req, res, next) {
  const obj={
    numeroBl: req.body.numeroBl,
    estActif:1,
}
BonLivraison.bonlivraisonSelectByInModel(obj)
.then(bonlivraison => {
  if (bonlivraison.length == 0 || req.body.id== bonlivraison[0].id) {
    const bonlivraisonObj = {
      id: req.body.id,
      contratId: req.body.contratId,
      flotteId: req.body.flotteId,
      camionId: req.body.camionId,
      chauffeurId: req.body.chauffeurId,
      trajetId: req.body.trajetId,
      equipeId: req.body.equipeId,
      numeroBl: req.body.numeroBl,
      dateChargement: req.body.dateChargement,
      heure: req.body.heure,
      poidsChargee: req.body.poidsChargee,
      poidsVide: req.body.poidsVide,
      tonnageSurBon: req.body.tonnageSurBon,
      distanceMine: req.body.distanceMine,
      files: linkedFile,
      statutBon: req.body.statutBon,
      Observations: req.body.Observations,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    BonLivraison.updateBonLivraisonInModel(bonlivraisonObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_insert" }));
  
  }
  else {
    res.status(500).json({ error: "dupplicatat du numero de bon saisi" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_selectBy" }))


  }


//supression logique d'un axe
function deleteBonLivraison(req, res, next) {
  BonLivraison.deleteBonLivraisonInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


function getTonnageByChauffeurAndMonth(req, res, next) {
  const obj={
    site: req.body.site,
    mois: req.body.mois,
    annee: req.body.annee
  }

  BonLivraison.getTonnageByChauffeurAndMonth(obj)
    .then(bon => res.status(201).json(bon))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}

function situationCamionParMois(req, res, next) {
  const obj={
    site: req.body.site,
    mois: req.body.mois,
    annee: req.body.annee
  }

  BonLivraison.situationCamionParMois(obj)
    .then(bon => res.status(201).json(bon))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}

function getBonLivraisonsByMonthAndYears(req, res, next) {
  const obj={
    site: req.body.site,
    mois: req.body.mois,
    annee: req.body.annee
  }
  BonLivraison.getBonLivraisonsByMonthAndYears(obj)
    .then(bon => res.status(201).json(bon))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


function getImageFile(req, res) {

  var image_file = req.params.File;
  var path_file = './uploads/bonLivraison/' + image_file;
  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    }
  });
}

module.exports = {
  getBonLivraisonsByMonthAndYears,
  files,
  getImageFile,
  getTonnageByChauffeurAndMonth,
  situationCamionParMois,
  getPointageToExportByDay,
  getPointageToEexportToExcel,
  bonlivraisonSelectBy,
  selectAllBonLivraison,
  selectByIdBonLivraison,
  addBonLivraison,
  updateBonLivraison,
  deleteBonLivraison
}