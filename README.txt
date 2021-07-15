Une fois le projet cloné vous devez en priorité définir les variables d'environnements.
Vous trouverez deux .env_examples l'un dans le dossier ./back l'autre dans le dossier ./frontend/globomania.
vous devez les renommer en .env et déclarer les infos suivantes

**************************************
.frontend/globomania => .env

API_KEY = //Clef API que vous pouvez vous procurer depuis https://tenor.com/gifapi (sans guillemets)

URL_SOCKET = 'http://localhost:3000'

**************************************

./back => .env

DBPASSWORD = //le mdp de votre base de donnée mySQL
DBUSER = //Votre nom d'utilisateur

TOKENSECRET = //chaîne de caractères complexe et aléatoire pour signer vos tokens

***************************************

La base de donnée est construite sous mySQL vous devez l'installer sur votre système pour lancer l'application.
Une fois les variables d'environnement initialisées, 
vous pouvez installer le backend => cd back > npm install > nodemon server
puis installer le frontend => cd frontend/globomania > npm install > npm start