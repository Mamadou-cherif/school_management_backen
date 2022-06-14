const Financement = require("../models/financement")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")
const initFinancementClass = require("../classes/financement")


function addFinancement(req, res, next) {
    const financementObj = {
        structureId: req.body.structureId,
        projetId: req.body.projetId,
        estActif: 1
    }
    console.log(financementObj)
    Financement.financementSelectByInModel(financementObj)
        .then(financement => {
            if (financement.length == 0) {
                const financementObj = {
                    id: req.body.id,
                    projetId: req.body.projetId,
                    structureId: req.body.structureId,
                    type: req.body.type,
                    typeAppui: req.body.typeAppui,
                    taux: req.body.taux,
                    observations: req.body.observations,
                    estActif: 1,
                    creationDate: req.body.creationDate,
                    creationUserId: req.body.creationUserId,
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId,
                    debut: req.body.debut,
                    fin: req.body.fin

                }
                Financement.addFinancementInModel(financementObj)
                    .then(() => res.status(200).json({ succes: "Ajout effectué avec succès" }))
                    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké d'ajout" }));
            }
            else {
                res.status(400).json({ error: "Cette structure finance déjà ce projet"})
            }


        })
        .catch(error => res.status(400).json(error))

}





//supression logique d'un financement
function disableFinancement(req, res, next) {
    const financementObj = {
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
    }

    Financement.disableFinancementInModel(financementObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

function updateFinancement(req, res, next) {
    const financementObj = {
        projetId: req.body.projetId,
        structureId: req.body.structureId,
        estActif: 1,
    }
    Financement.financementSelectByInModel(financementObj)
        .then(financement => {
            if ((financement.length == 0) || (financement[0].id == req.body.id)) {
                const financementObj = {
                    id: req.body.id,
                    projetId: req.body.projetId,
                    structureId: req.body.structureId,
                    type: req.body.type,
                    typeAppui: req.body.typeAppui,
                    taux: req.body.taux,
                    observations: req.body.observations,
                    creationDate: req.body.creationDate,
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId,


                }
                Financement.updateFinancementInModel(financementObj)
                    .then(() => res.status(200).json({ succes: "Modification effectuée avec succès" }))
                    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
            }
            else {
                res.status(400).json({ error: "Cette structure finance déjà ce projet"})
            }
        })
}

function financementSelectBy(req, res, next) {
    const financement = {
        id: req.body.id || null,
        projetId: req.body.projetId || null,
        structureId: req.body.structureId || null,
        type: req.body.type || null,
        typeAppui: req.body.typeAppui || null,
        taux: req.body.taux || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null

    }
    Financement.financementSelectByInModel(financement)
        .then(financement => res.status(200).json(financement))
        .catch(error => res.status(400).json(error))
}

function getAsingleFinancement(req, res, next) {
    const id = req.params.id
    Financement.getFinancementByIdInModel(id)
        .then(financement => res.status(200).json(financement))
        .catch(error => res.status(400).json(error))
}


function getAllFinancements(req, res, next) {
    initFinancementClass.estActif = req.body.estActif
    initFinancementClass.estActif = req.body.debut
    initFinancementClass.estActif = req.body.fin

    Financement.getAllFinancementInModel(initFinancementClass)
        .then(financements => res.status(200).json(financements))
        .catch(error => res.status(400).json(error))
}






module.exports = {
    disableFinancement,
    addFinancement,
    updateFinancement,
    getAsingleFinancement,
    getAllFinancements,
    financementSelectBy
}