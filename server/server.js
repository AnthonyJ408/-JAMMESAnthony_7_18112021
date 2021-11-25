//Appel du package http de node pour créer un serveur
const http = require('http');
const config = require('/config/config');
const app = require('./app');
app.set('port',config.port)
//Appel de la fonction a chaques requêtes faites sur le serveur
const server = http.createServer(app);
server.listen(config.port);