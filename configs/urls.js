
let tempURL = 'https://www.googleapis.com'

if ('production' == NODE_ENV) {
  tempURL = 'https://www.googleapis.com'
}

module.exports = {
  temp: {
    baseUrl: tempURL,
    endPoints: {
      
    }
  }
}