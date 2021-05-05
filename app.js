const express = require('express')
const morgan = require('morgan');
const app = express()

const PORT = process.env.PORT || 4001;

app.use(morgan('dev'));
app.use(express.static('public'));


const sqlite3 = require('sqlite3')

const connessioneDataBase = {
  db: null,
  apri: function() {
    this.db = new sqlite3.Database('./db/db.db', (err) => {if(err!==null) {console.log(err)} else {console.log('db opened')} })
  },
  chiudi: function() {
    this.db.close((err) => { if(err!==null) {console.log(err)} else {console.log('db closed')} })
  }
}


app.get('/universita', function(req, res, next) {  
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all("SELECT * FROM UNIVERSITA", function(err, all) {  
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

app.get('/corsi', function(req, res, next) {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all("SELECT * FROM CORSO", function(err, all) {  
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

app.get('/esami', function(req, res, next) {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all("SELECT * FROM ESAME", function(err, all) {  
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

app.get('/login', function(req, res, next) {
  res.send()
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


