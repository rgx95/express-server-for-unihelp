//
// requires
//
const express = require('express')
const morgan = require('morgan')
// routers
const cercaRouter = require('./routers/cercaRouter')



// app
const app = express()
// port
const PORT = process.env.PORT || 4001;
// log
app.use(morgan('dev'));
// declaring static folder
app.use(express.static('public'));



//
// routers
//
app.use('/', cercaRouter)



// login
app.get('/login', function(req, res, next) {
  res.send()
})



//
// starting server listening
//
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


