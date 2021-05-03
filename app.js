const express = require('express')
// Instantiate the app here
const app = express()

const PORT = process.env.PORT || 4001;


app.use(express.static('public'));


app.get('/universita', function(req, res, next) {
  console.log('get request /universita received')

  /*let arr = new Array(15)
  arr.fill('Università di ')*/
  let arr = ['universita di pisa', 'universita di firenze', 'universita di siena', 'universita di roma', 'universita di milano', 'universita di bologna', 'universita di torino', 'universita di napoli', 'universita di palermo']

  res.json(arr)
})

app.get('/corsi', function(req, res, next) {
  console.log('get request /corsi received')

  let arr = new Array(15)
  arr.fill('Corso ')
  arr = arr.map((v, i) => v += i)
  
  res.json(arr)
})

app.get('/esami', function(req, res, next) {
  console.log('get request /esami received')

  let arr = new Array(15)
  arr.fill('Esame ')
  arr = arr.map((v, i) => v += i)

  res.json(arr)
})

app.get('/login', function(req, res, next) {
  console.log('try login with user: '+req.query.user+' & pass: '+req.query.pass)
  res.send()
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});