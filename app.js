//
// requires
//
const express = require('express')
const morgan = require('morgan')
// routers
const cercaRouter = require('./routers/cercaRouter')
const accountRouter = require('./routers/accountRouter')



// app
const app = express()
// port
const PORT = process.env.PORT || 4001;
// log
app.use(morgan('dev'));
// declaring static folder
app.use(express.static('public'));

// body-parser
app.use(express.json());       // JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // url-encoded bodies



// session
const session = require('express-session')
// crypto
const crypto = require('crypto') // crypto.randomBytes(20).toString('hex')

app.use(session({
  secret: crypto.randomBytes(20).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 300000}
}))



//
// routers
//
app.use('/', cercaRouter)
app.use('/', accountRouter)



//
// starting server listening
//
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


