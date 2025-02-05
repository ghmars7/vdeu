const express = require('express');
const router = express.Router();
const { Client, Fournisseur, Categorie, Produit, FournisseurProduit, Commande, LigneCommande } = require('./models');

// Clients

router.post('/clients', async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client non trouvé' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/clients/:id', async (req, res) => {
    try {
        const [updated] = await Client.update(req.body, { where: { id_client: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Client non trouvé' });
        res.status(200).json({ message: 'Client mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/clients/:id', async (req, res) => {
    try {
        const deleted = await Client.destroy({ where: { id_client: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Client non trouvé' });
        res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// commandes client

router.get('/clients/:id/commandes', async (req, res) => {
    try {
        const clientId = req.params.id;
        const commandes = await Commande.findAll({
            where: { id_client: clientId },
            include: [
                { model: Client, as: 'Client' },
                { model: LigneCommande, as: 'LigneCommandes' },
            ],
        });
        if (!commandes.length) return res.status(404).json({ message: 'Aucune commande trouvée pour ce client' });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// fournisseurs

router.post('/fournisseurs', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.create(req.body);
        res.status(201).json(fournisseur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fournisseurs', async (req, res) => {
    try {
        const fournisseurs = await Fournisseur.findAll();
        res.json(fournisseurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fournisseurs/:id', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findByPk(req.params.id);
        if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/fournisseurs/:id', async (req, res) => {
    try {
        const [updated] = await Fournisseur.update(req.body, { where: { id_fournisseur: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Fournisseur non trouvé' });
        res.status(200).json({ message: 'Fournisseur mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/fournisseurs/:id', async (req, res) => {
    try {
        const deleted = await Fournisseur.destroy({ where: { id_fournisseur: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Fournisseur non trouvé' });
        res.status(200).json({ message: 'Fournisseur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// categories

router.post('/categories', async (req, res) => {
    try {
        const categorie = await Categorie.create(req.body);
        res.status(201).json(categorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/categories/:id', async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);
        if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.json(categorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/categories/:id', async (req, res) => {
    try {
        const [updated] = await Categorie.update(req.body, { where: { id_categories: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json({ message: 'Catégorie mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/categories/:id', async (req, res) => {
    try {
        const deleted = await Categorie.destroy({ where: { id_categories: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// produits

router.post('/produits', async (req, res) => {
    try {
        const produit = await Produit.create(req.body);
        res.status(201).json(produit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/produits', async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: [
                { model: Categorie, as: 'Categorie' },
                { model: Fournisseur, through: { attributes: [] }, as: 'Fournisseurs' },
            ],
        });
        res.json(produits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/produits/:id', async (req, res) => {
    try {
        const produit = await Produit.findByPk(req.params.id, {
            include: [
                { model: Categorie, as: 'Categorie' },
                { model: Fournisseur, through: { attributes: [] }, as: 'Fournisseurs' },
            ],
        });
        if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(produit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/produits/:id', async (req, res) => {
    try {
        const [updated] = await Produit.update(req.body, { where: { id_produit: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/produits/:id', async (req, res) => {
    try {
        const deleted = await Produit.destroy({ where: { id_produit: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// commandes avec produit specifique

router.get('/produits/:id/commandes', async (req, res) => {
    try {
        const produitId = req.params.id;

        const commandes = await Commande.findAll({
            include: [
                {
                    model: LigneCommande,
                    as: 'LigneCommandes',
                    where: { id_produit: produitId },
                    required: true,
                },
                { model: Client, as: 'Client' },
            ],
        });

        if (!commandes.length) return res.status(404).json({ message: 'Aucune commande trouvée pour ce produit' });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// commandes

router.post('/commandes', async (req, res) => {
    try {
        const commande = await Commande.create(req.body);
        res.status(201).json(commande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/commandes', async (req, res) => {
    try {
        const commandes = await Commande.findAll({
            include: [
                { model: Client, as: 'Client' },
                { model: LigneCommande, as: 'LigneCommandes' },
            ],
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id, {
            include: [
                { model: Client, as: 'Client' },
                { model: LigneCommande, as: 'LigneCommandes' },
            ],
        });
        if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
        res.json(commande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/commandes/:id', async (req, res) => {
    try {
        const [updated] = await Commande.update(req.body, { where: { id_commande: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Commande non trouvée' });
        res.status(200).json({ message: 'Commande mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/commandes/:id', async (req, res) => {
    try {
        const deleted = await Commande.destroy({ where: { id_commande: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Commande non trouvée' });
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// lignes-commande

router.post('/lignes-commande', async (req, res) => {
    try {
        const ligneCommande = await LigneCommande.create(req.body);
        res.status(201).json(ligneCommande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/lignes-commande', async (req, res) => {
    try {
        const lignesCommande = await LigneCommande.findAll({
            include: [
                { model: Produit, as: 'Produit' },
                { model: Commande, as: 'Commande' },
            ],
        });
        res.json(lignesCommande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/lignes-commande/:id', async (req, res) => {
    try {
        const ligneCommande = await LigneCommande.findByPk(req.params.id, {
            include: [
                { model: Produit, as: 'Produit' },
                { model: Commande, as: 'Commande' },
            ],
        });
        if (!ligneCommande) return res.status(404).json({ message: 'Ligne de commande non trouvée' });
        res.json(ligneCommande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/lignes-commande/:id', async (req, res) => {
    try {
        const [updated] = await LigneCommande.update(req.body, { where: { id_ligne_commande: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Ligne de commande non trouvée' });
        res.status(200).json({ message: 'Ligne de commande mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/lignes-commande/:id', async (req, res) => {
    try {
        const deleted = await LigneCommande.destroy({ where: { id_ligne_commande: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Ligne de commande non trouvée' });
        res.status(200).json({ message: 'Ligne de commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;