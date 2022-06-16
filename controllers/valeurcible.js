const ValeurCible = require("../models/valeurcible")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt = require("bcrypt")

function selectAllValeurCible(req, res, next) {

    ValeurCible.selectAllValeurInModel(req)
      .then(valeurcible => res.status(200).json(valeurcible))
      .catch(error => res.status(400).json(error))
  }

  module.exports= {
      selectAllValeurCible
  }