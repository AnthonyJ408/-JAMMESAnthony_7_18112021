//Utilisation du framework Express pour faciliter le développement du serveur
const express = require("express");
const app = express();
const path = require("path");
//BodyParser pour transformer le corps de la requête en JSON
const bodyParser = require("body-parser");
const {sequelize} = require('./models');
//Router
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/network");
//CORS, Accés depuis n'importe quelle origine avec les méthodes mentionnées
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// sequelize.sync() {
// .then(() => {
//   console.log('Connexion à la base de donnée réussie')
// });
// .catch(() =>{
//   console.log('Connexion à la base de donnée a échouée')
//   }}
app.use(express.json());
app.use(bodyParser.json());
//Autoriser la requête sur le dossier statique images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
//Export d'express pour le "require" dans d'autres fichiers
module.exports = app;
console.log('Hello')