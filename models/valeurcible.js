const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");


function selectAllValeurInModel(theReq) {
    return new Promise((resolve, reject) => {
      connection.query("CALL valeurcibles_selectAll(?,?,?)",
        [
          1,
          null,
          null
        ],
  
        ((err, results, fields) => {
          if (err) {
            reject(err)
          }
          resolve(results[0])
        })
      )
    })
  }

  module.exports = {
    selectAllValeurInModel,
  }