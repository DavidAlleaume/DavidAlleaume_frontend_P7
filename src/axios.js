const axios = require('axios')
// Initialisation de l'url avec laquelle axios adressera ses requêtes
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
})

export default instance