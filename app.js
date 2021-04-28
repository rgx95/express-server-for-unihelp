const express = require('express')
// Instantiate the app here
const app = express()

const PORT = process.env.PORT || 4001;


app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});