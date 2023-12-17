const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function selectAllSession() {
  return new Promise((resolve, reject) => {

    connection.query("CALL sessions_selectAll(?,?,?)",
      [
        1,
        null,
        null,
      ],

      ((err, results, fields) => {
        if (err) {
            console.log(err)
          reject(err)
        }
        else{
            resolve(results[0])
        }
      })
    )
  })
}


module.exports = {
  selectAllSession,
}