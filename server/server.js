//Appel du package http de node pour créer un serveur
const http = require('http');
const app = require('./app');

//Appel de la fonction a chaques requêtes faites sur le serveur
const server = http.createServer(app);
server.listen(3000);