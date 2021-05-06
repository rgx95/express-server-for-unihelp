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

module.exports = connessioneDataBase