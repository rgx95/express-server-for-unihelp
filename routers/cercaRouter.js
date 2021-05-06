const express = require('express')
const cercaRouter = express.Router()
// db
const connessioneDataBase = require('../scripts/connessioneDataBase')



//
//
//
cercaRouter.get('/universita/:uniId', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.get(`SELECT * FROM UNIVERSITA WHERE ID=${req.params.uniId}`, function(err, row) {
    if (err) res.status(500).send(err)

    if (row) 
    {
      res.json(row)
    }
    else 
    {
      res.status(404).send()
    }
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/facolta/:facoltaId', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM FACOLTA WHERE ID=${req.params.facoltaId}`, function(err, row) {  
    if (err) res.status(500).send(err)
    
    if (row) 
    {
      res.json(row)
    }
    else 
    {
      res.status(404).send()
    }
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/corsi/:corsoId', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM CORSI WHERE ID=${req.params.corsoId}`, function(err, row) {  
    if (err) res.status(500).send(err)
    
    if (row) 
    {
      res.json(row)
    }
    else 
    {
      res.status(404).send()
    }
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/esami/:esameId', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM ESAMI WHERE ID=${req.params.esameId}`, function(err, row) {  
    if (err) res.status(500).send(err)
    
    if (row) 
    {
      res.json(row)
    }
    else 
    {
      res.status(404).send()
    }
  });      

  connessioneDataBase.chiudi()
})



//
// cerca
//
cercaRouter.get('/universita', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM UNIVERSITA`, function(err, all) {  
    if (err) res.status(500).send(err)
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/universita/:uniId/facolta', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM FACOLTA WHERE UNIVERSITA=${req.params.uniId}`, function(err, all) {  
    if (err) res.status(500).send(err)
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/universita/:uniId/facolta/:facoltaId/corsi', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM CORSI WHERE FACOLTA=${req.params.facoltaId}`, function(err, all) {  
    if (err) res.status(500).send(err)
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})

cercaRouter.get('/universita/:uniId/facolta/:facoltaId/corsi/:corsoId/esami', (req, res, next) => {
  connessioneDataBase.apri()
  let db = connessioneDataBase.db

  db.all(`SELECT * FROM ESAMI WHERE CORSO=${req.params.corsoId}`, function(err, all) {  
    if (err) res.status(500).send(err)
    res.json(all)
  });      

  connessioneDataBase.chiudi()
})



// export
module.exports = cercaRouter


