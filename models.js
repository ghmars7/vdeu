const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/database');

// Client
const Client = sequelize.define('Client', {
    id_client: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nom: DataTypes.STRING(55),
    prenom: DataTypes.STRING(55),
    email: DataTypes.STRING(55),
    adresse: DataTypes.STRING(110),
    code_postal: DataTypes.INTEGER,
    num_telephone: DataTypes.STRING(55),
}, { tableName: 'clients', timestamps: false });

// Fournisseur
const Fournisseur = sequelize.define('Fournisseur', {
    id_fournisseur: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nom_entreprise: DataTypes.STRING(55),
    email: DataTypes.STRING(55),
    num_telephone: DataTypes.STRING(55),
}, { tableName: 'fournisseurs', timestamps: false });

// Catégorie
const Categorie = sequelize.define('Categorie', {
    id_categories: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nom: DataTypes.STRING(55),
}, { tableName: 'categories', timestamps: false });

// Produit
const Produit = sequelize.define('Produit', {
    id_produit: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_categorie: {type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id_categories',
        },
    },
    nom: DataTypes.STRING(55),
    description: DataTypes.TEXT,
    prix_unitaire: DataTypes.DECIMAL(10, 2),
    quantite: DataTypes.INTEGER,
}, { tableName: 'produits', timestamps: false });

// FournisseurProduit (table association)
const FournisseurProduit = sequelize.define('FournisseurProduit', {
    id_fournisseur: {type: DataTypes.INTEGER, primaryKey: true,
        references: {
            model: 'fournisseurs',
            key: 'id_fournisseur',
        },
    },
    id_produit: {type: DataTypes.INTEGER, primaryKey: true,
        references: {
            model: 'produits',
            key: 'id_produit',
        },
    },
}, { tableName: 'fournisseur_produit', timestamps: false });

// Commande
const Commande = sequelize.define('Commande', {
    id_commande: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_client: { type: DataTypes.INTEGER,
        references: {
            model: 'clients',
            key: 'id_client',
        },
    },
    date_commande: DataTypes.DATE,
    date_expidition: DataTypes.DATE,
}, { tableName: 'commandes', timestamps: false });

// LigneCommande
const LigneCommande = sequelize.define('LigneCommande', {
    id_ligne_commande: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_commande: { type: DataTypes.INTEGER,
        references: {
            model: 'commandes',
            key: 'id_commande',
        },
    },
    id_produit: { type: DataTypes.INTEGER,
        references: {
            model: 'produits',
            key: 'id_produit',
        },
    },
    quantite: DataTypes.INTEGER,
    prix: DataTypes.DECIMAL(10, 2),
}, { tableName: 'ligne_commande', timestamps: false });

// Relations
Client.hasMany(Commande, { foreignKey: 'id_client' });
Commande.belongsTo(Client, { foreignKey: 'id_client' });

Produit.belongsTo(Categorie, { foreignKey: 'id_categorie' });
Categorie.hasMany(Produit, { foreignKey: 'id_categorie' });

Fournisseur.belongsToMany(Produit, { through: FournisseurProduit, foreignKey: 'id_fournisseur' });
Produit.belongsToMany(Fournisseur, { through: FournisseurProduit, foreignKey: 'id_produit' });

Commande.hasMany(LigneCommande, { foreignKey: 'id_commande' });
LigneCommande.belongsTo(Commande, { foreignKey: 'id_commande' });

LigneCommande.belongsTo(Produit, { foreignKey: 'id_produit' });
Produit.hasMany(LigneCommande, { foreignKey: 'id_produit' });

module.exports = {
    sequelize,
    Client,
    Fournisseur,
    Categorie,
    Produit,
    FournisseurProduit,
    Commande,
    LigneCommande,
};