const AnneeCible = require("../models/anneecible")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
const initAnneeCibleClass = require("../classes/anneecible")


function addAnneeCible(req, res, next) {

    const annecible = {
        libelle: req.body.libelle,
        estActif: 1,
    }
    AnneeCible.AnneeCibleSelectByInModel(annecible)
        .then(annecible => {
            if (annecible.length == 0) {

                const annecible = {
                    code: req.body.code,
                    estActif: 1,
                }
                AnneeCible.AnneeCibleSelectByInModel(annecible)
                    .then(codes => {
                        if (codes.length == 0) {
                            initAnneeCibleClass.libelle = req.body.libelle
                            initAnneeCibleClass.code = req.body.code
                            initAnneeCibleClass.libelle = req.body.libelle
                            initAnneeCibleClass.creationUserId = req.body.creationUserId
                            AnneeCible.addAnneeCibleInModel(initAnneeCibleClass)
                                .then(() => res.status(201).json({ succes: "La création a reussi" }))
                                .catch(() => res.status(400).json({ error: "Erreur de la procédure stockée d'ajout" }));
                        }
                        else {
                            res.status(500).json({ error: "Ce code de cette année existe déjà" })
                        }
                    })
                    .catch(() => res.status(400).json({ error: "Erreur retournée par la procédure stockée de selectBy" }))


            }
            else {
                res.status(500).json({ error: "cet annecible existe déjà" })
            }
        })
        .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))


}

//supression logique d'un annecible
function disableAnneeCible(req, res, next) {
    initAnneeCibleClass.id = req.body.id
    initAnneeCibleClass.modifUserId = req.body.modifUserId
    initAnneeCibleClass.modifDate = req.body.modifDate

    AnneeCible.disableAnneeCibleInModel(initAnneeCibleClass)
        .then(() => res.status(201).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

function updateAnneeCible(req, res, next) {

    const annecibleObj = {
        libelle: req.body.libelle,
        estActif: 1,
    }
    AnneeCible.AnneeCibleSelectByInModel(annecibleObj)
        .then(annecible => {
            if ((annecible.length == 0) || (annecible[0].id == req.body.id)) {
                const annecibleObj = {

                    code: req.body.code,
                    estActif: 1,
                }
                AnneeCible.AnneeCibleSelectByInModel(annecibleObj)
                    .then(code => {
                        if ((code.length == 0) || (code[0].id == req.body.id)) {
                            initAnneeCibleClass.id = req.body.id
                            initAnneeCibleClass.libelle = req.body.libelle
                            initAnneeCibleClass.code = req.body.code
                            initAnneeCibleClass.libelle = req.body.libelle
                            initAnneeCibleClass.modifDate = req.body.modifDate
                            initAnneeCibleClass.modifUserId = req.body.modifUserId

                            AnneeCible.updateAnneeCibleInModel(initAnneeCibleClass)
                                .then(() => res.status(200).json({ succes: "la modification a reussi" }))
                                .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
                        }
                        else {
                            res.status(500).json({ error: "Ce code de cette année existe déjà" })
                        }
                    })
                    .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))

            }
            else {
                res.status(500).json({ error: "cet annecible existe déjà" })
            }
        })
        .catch(() => res.status(400).json({ error: "erreur retournée par la procédure stockée de selectBy" }))


}


function anneCibleSelectById(req, res, next) {
    const id = req.params.id
    AnneeCible.anneCibleSelectById(id)
        .then(annecible => res.status(200).json(annecible))
        .catch(error => res.status(400).json(error))
}


function getAllAnneeCibles(req, res, next) {
    initAnneeCibleClass.estActif = req.body.estActif
    initAnneeCibleClass.debut = req.body.debut
    initAnneeCibleClass.fin = req.body.fin

    AnneeCible.getAllAnneeCibleInModel(initAnneeCibleClass)
        .then(annecibles => res.status(200).json(annecibles))
        .catch(error => res.status(400).json(error))
}


function deleteAnneeCible(req, res, next) {
    AnneeCible.deleteAnneeCibleInModel(req.params.id)
        .then(() => res.status(200).json({ succes: "Suppression effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Suppression impossible car cette cette année cible appartient dans une autre table" }));
}



module.exports = {
    deleteAnneeCible,
    disableAnneeCible,
    addAnneeCible,
    updateAnneeCible,
    anneCibleSelectById,
    getAllAnneeCibles
}