const express= require("express")
const app= express()

function bienvenue(req, res, next){
    
        res.status(200).json({succes: "Bienvenue sur votre API de gestion de projets"})
    
    
}



module.exports= {bienvenue}