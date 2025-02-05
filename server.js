const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(routes);

db.sequelize.createSchema({force: true}).then(() => {
    console.log('Les modèles ont été synchronisés avec succès.');
}).catch((error) => {
    console.error('Erreur lors de la synchronisation des modèles :', error);
});

app.listen(PORT, () => {
    console.log(`Serveur : http://localhost:${PORT}`);
});