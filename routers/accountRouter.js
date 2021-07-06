const express = require('express')
const accountRouter = express.Router()
// db
const connessioneDataBase = require('../scripts/connessioneDataBase')
const validation = require('../scripts/validation')


// mail
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  auth: {
    user: 'luca.ruggirello95@gmail.com',
    pass: 'aknfuhgskcvdyood'
  },
  host: 'smtp.gmail.com'
});

const mailConfirmationKeys = []

const sendConfirmationEmail = (obj) => {
  console.log(obj)
  mailConfirmationKeys.push(obj)
  var mailOptions = {
    from: 'luca.ruggirello95@gmail.com',
    to: obj.to,
    subject: 'Conferma email',
    html: '<h1>Conferma email</h1><br><br><a href="http://localhost:4001/confirmEmail?k='+obj.key+'"><button>Conferma</button></a><br><em>conferma l\'email entro 24h per riattivare l\'account</em>'
  };

  console.log(mailOptions)

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

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
    UNIVERSITA.ID as 'UNIVERSITA.ID', UNIVERSITA.NOME as 'UNIVERSITA.NOME'
    FROM UTENTI 
    LEFT JOIN UNIVERSITA ON UTENTI.UNIVERSITA=UNIVERSITA.ID
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

    let field = req.query.field
    if (field == 'mail') {
      field = "ATTIVO = 0, MAIL"
    } else {
      field=field.toUpperCase()
    }

    db.run(`UPDATE UTENTI SET ${field} = ? WHERE ID = ?`, [req.query.value, req.session.user.ID], function(err) {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        console.log(`Row(s) updated: ${this.changes}`)
        
        req.session.user[req.query.field.toUpperCase()] = req.query.value

        if (field == 'ATTIVO = 0, MAIL') {
          sendConfirmationEmail({to: req.query.value, key: Math.random()*10000000*(new Date()), datetime: new Date()})
        }

        res.json(req.session)
      }
    })

    connessioneDataBase.chiudi()

  }
})

accountRouter.get('/confirmEmail', (req, res, next) => {
  const key = req.query.k
  let index = -1
  let mail

  console.log(mailConfirmationKeys)
  
  mailConfirmationKeys.forEach((el, i) => {
    if (el.key == key) {
      index = i
      mail = el.to
    }
  })

  console.log(key + ' ' + index + ' ' + mail)

  if (index == -1) {
    return res.status(500).send()
  }

  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.run(`UPDATE UTENTI SET ATTIVO = 1 WHERE MAIL = ?`, [mail], function(err) {
    if (err) {
      console.log(err)
      res.status(500).redirect('http://localhost:4001/#!/erroreConfermaEmail')
    } else {
      console.log(`Row(s) updated: ${this.changes}`)
    }
  })

  connessioneDataBase.chiudi()

  mailConfirmationKeys.splice(index, 1)

  res.status(200).redirect('http://localhost:4001/#!/emailConfermata')

})

accountRouter.post('/register', (req, res, next) => {
  console.log(req.body)
  
  let mail
  let username
  let password 
  
  if ((validation.mail(req.body.mail) && validation.username(req.body.username) && validation.password(req.body.password))) {
    mail = req.body.mail
    username = req.body.username
    password = req.body.password
  } else {
    return res.status(400).send();
  }  
  

  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.run(`INSERT INTO UTENTI (ATTIVO, MAIL, USERNAME, PASSWORD, PUNTI) VALUES (0, ?, ?, ?, 0)`,[
    mail, username, password
  ], function(err) {
    if (err) {
      console.log(err)
      return res.status(500).send();
    } else {
      sendConfirmationEmail({to: mail, key: Math.random()*10000000*(new Date()), datetime: new Date()})
      res.status(201).send()
    }
  })

  connessioneDataBase.chiudi()
})



module.exports = accountRouter


