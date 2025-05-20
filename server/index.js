const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Récupérer toutes les déclarations
app.get('/api/declarations', async (req, res) => {
  try {
    const declarations = await prisma.declaration.findMany({
      orderBy: {
        dateCreation: 'desc'
      }
    });
    res.json(declarations);
  } catch (error) {
    console.error('Erreur lors de la récupération des déclarations:', error);
    res.status(500).json({ error: 'Impossible de récupérer les déclarations' });
  }
});

// Récupérer une déclaration par ID
app.get('/api/declarations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const declaration = await prisma.declaration.findUnique({
      where: { id }
    });
    
    if (!declaration) {
      return res.status(404).json({ error: 'Déclaration non trouvée' });
    }
    
    res.json(declaration);
  } catch (error) {
    console.error(`Erreur lors de la récupération de la déclaration ${req.params.id}:`, error);
    res.status(500).json({ error: 'Impossible de récupérer la déclaration' });
  }
});

// Créer une nouvelle déclaration
app.post('/api/declarations', async (req, res) => {
  try {
    const declaration = await prisma.declaration.create({
      data: req.body
    });
    res.status(201).json(declaration);
  } catch (error) {
    console.error('Erreur lors de la création de la déclaration:', error);
    res.status(500).json({ error: 'Impossible de créer la déclaration' });
  }
});

// Mettre à jour une déclaration
app.put('/api/declarations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const declaration = await prisma.declaration.update({
      where: { id },
      data: req.body
    });
    res.json(declaration);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la déclaration ${req.params.id}:`, error);
    res.status(500).json({ error: 'Impossible de mettre à jour la déclaration' });
  }
});

// Supprimer une déclaration
app.delete('/api/declarations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.declaration.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    console.error(`Erreur lors de la suppression de la déclaration ${req.params.id}:`, error);
    res.status(500).json({ error: 'Impossible de supprimer la déclaration' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Gestion de la fermeture propre
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
