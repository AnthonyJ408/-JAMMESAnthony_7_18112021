Groupomania: Projet 7 Openclassrooms


Etape 1:

Cloner le projet,
ensuite lancer $ npm install dans le terminal

Etape 2:

Pour que les données de l'application soient stockées il faut se connecter à notre base de données.
Sur le projet les identifiants ne sont pas fournis mais le code utilise le chemin de mes variables d'environnement 
je vous conseille donc de créer les mêmes dans le dossier server $cd server

Créer le dossier config
  $ mkdir config
  $ cd config
 
Créer le fichier authConfig.js 
$ touch authConfig.js 
  avec ce modèle:
    module.exports = {
    secret: 'clé JWT',
    admin: 'clé d'accés création de compte admin' };

Créer le fichier config.js
  $ touch config.js
  avec ce modèle:
    module.exports = {
    database: 'nom de la base de donnée',
    user: 'utilisateur',
    port: 'port',
    password: 'mot de passe',
    options: {
      dialect: 'mysql',
      host: 'localhost',  },
    };
    
 Créer également le dossier statique images qui va recevoir les fichiers multimédias des utilisateurs
    $ cd ..
    $ mkdir images
    
Etape 3:
  Il faut initialiser la table "roles" dans mysql
  pour cela j'ai créé une fonction dans server/models/index.js de la ligne 43 à 90
  qu'il vous suffit de décommenter et de commenter à la place .sync(); ligne 42.
  Ceci va créer deux utilisateurs avec le rôle admin et user.
  Si vous préférer les créer vous même sacher que la clé dans authConfig est demandé 
  dans la requête pour accepter la création de compte admin
  
Etape 4:
Lancer deux terminals distincts :
  le premier sur => 
  cd server 
  npm start
  
  le deuxième sur => 
  cd client
  npm run serve




