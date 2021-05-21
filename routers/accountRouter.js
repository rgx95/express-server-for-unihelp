const express = require('express')
const accountRouter = express.Router()
// db
const connessioneDataBase = require('../scripts/connessioneDataBase')
const validation = require('../scripts/validation')



accountRouter.get('/login', (req, res, next) => {
  let user = req.query.user
  let pass = req.query.pass

  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  if (!user || !pass) {
    res.json({logged: false, message: 'Bad request', code: 400})
  } else {
    db.get(`SELECT 
    UTENTI.ID, UTENTI.USERNAME, UTENTI.PASSWORD, UTENTI.MAIL, UTENTI.ATTIVO, 
    UTENTI.NOME, UTENTI.COGNOME, UTENTI.PUNTI, UTENTI.MATRICOLA,
    CORSI.ID as 'CORSO.ID', CORSI.NOME as 'CORSO.NOME',
    FACOLTA.ID as 'FACOLTA.ID', FACOLTA.NOME as 'FACOLTA.NOME',
    UNIVERSITA.ID as 'UNIVERSITA.ID', UNIVERSITA.NOME as 'UNIVERSITA.NOME'
    FROM UTENTI 
    LEFT JOIN CORSI ON UTENTI.CORSO=CORSI.ID
    LEFT JOIN FACOLTA ON CORSI.FACOLTA=FACOLTA.ID
    LEFT JOIN UNIVERSITA ON FACOLTA.UNIVERSITA=UNIVERSITA.ID
    WHERE (USERNAME='${user}' OR MAIL='${user}') AND PASSWORD='${pass}'`, function(err, row) {
      if (err) { 
        res.json({logged: false, message: 'something went wrong with sql query', code: 500})
      } else if (row) {

        if (!row.ATTIVO) {          
          res.send({logged: false, message: 'Account non ancora attivato, controlla l\'email!', code: 403})
        } else {
          req.session.user = new Object()
          Object.assign(req.session.user, row)          
          console.log(`${req.session.user.USERNAME} successfully logged in`)
          res.json({logged: true, message: 'Accesso effettuato', code: 200})
        }

      } else {
        res.send({logged: false, message: 'Username o password errati', code: 404})
      }
    }); 

    connessioneDataBase.chiudi()
  }
  
})

accountRouter.get('/sessExists', (req, res, next) => {
  if (req.session.user) {
    res.json(req.session)
  } else {
    res.status(404).send()
  }
})

accountRouter.get('/sessDestroy', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(function(err) {
      // cannot access session here
      if (err ==  null) {
        console.log('session destroyed')
        res.send()
      }
      else
      {
        console.log(err)
        res.status(500).send()
      }
    })
  } else {
    res.status(404).send()
  }
})

accountRouter.put('/update', (req, res, next) => {
  if (!req.session.user || !validation.validaModifica(req.query.field, req.query.value)) {
    res.status(400).send()
  } else {

    connessioneDataBase.apri()
    let db = connessioneDataBase.db

    db.run(`UPDATE UTENTI SET ${req.query.field.toUpperCase()} = ? WHERE ID = ?`, [req.query.value, req.session.user.ID], function(err) {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        console.log(`Row(s) updated: ${this.changes}`);
        req.session.user[req.query.field.toUpperCase()] = req.query.value
        res.json(req.session)
      }
    })

    connessioneDataBase.chiudi()

  }
})



module.exports = accountRouter


