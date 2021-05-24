const validation = new Object()

validation.username = function(value) {
  // no spaces, 8-15
  return /^[a-z0-9]{8,15}$/ig.test(value)
}

validation.password = function(value) {
  // 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)
}

validation.mail = function(value) {  
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

validation.matricola = function(value) {
  if (value != null) {    
    return 4 < value.length && value.length < 10
  }
  return true
}

validation.nome = function(value) {
  return value.length < 100
}

validation.validaModifica = function(field, value) {
  switch(field) {
    case 'mail':
      return this.mail(value)
      break;
    case 'username':
      return this.username(value)
      break;
    case 'password':
      return this.password(value)
      break;
    case 'nome':
      return this.nome(value)
      break;
    case 'cognome':
      return this.nome(value)
      break;
    case 'matricola':
      return this.matricola(value)
      break;
    case 'universita':
      return true
      break;
    default:
      return false
      break;
  }
}

module.exports = validation