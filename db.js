const mysql = require("mysql")

const db = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database:"users_token"

})

db.connect((err)=>{
    if(err) return console.log(err)
    return console.log("Connection Created")
})


module.exports = db