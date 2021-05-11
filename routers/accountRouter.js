const express = require('express')
const accountRouter = express.Router()
// db
const connessioneDataBase = require('../scripts/connessioneDataBase')



accountRouter.get('/login', (req, res, next) => {
  let user = req.query.user
  let pass = req.query.pass

  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  if (!user || !pass) {
    res.json({logged: false, message: 'Bad request', code: 400})
  } else {
    db.get(`SELECT * FROM UTENTI WHERE USERNAME='${user}' OR MAIL='${user}'`, function(err, row) {
      if (err) { 
        res.json({logged: false, message: 'Something went wrong with sql query', code: 500})
      } else if (row) {
        if (!row.ATTIVO) {
          res.json({logged: false, message: 'Account da attivare', code: 403})
        } else if (row.PASSWORD == pass) {
          res.json({logged: true, message: 'Accesso effettuato', code: 200})
        } else {
          res.json({logged: false, message: 'Password errata', code: 403})
        }
      } else {
        res.send({logged: false, message: 'Nome utente inesistente', code: 404})
      }
    }); 

    connessioneDataBase.chiudi()
  }
  
})



module.exports = accountRouter


