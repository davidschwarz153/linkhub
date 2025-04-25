const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Pfad zur JSON-Datei
const dataFilePath = path.join(__dirname, 'data', 'links.json');

// Stelle sicher, dass das Verzeichnis existiert
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Stelle sicher, dass die JSON-Datei existiert
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Hilfsfunktion zum Lesen der Links
const readLinks = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Fehler beim Lesen der Links:', error);
    return [];
  }
};

// Hilfsfunktion zum Schreiben der Links
const writeLinks = (links) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(links, null, 2));
  } catch (error) {
    console.error('Fehler beim Schreiben der Links:', error);
  }
};

// Routes
app.get('/api/links', (req, res) => {
  const links = readLinks();
  res.json(links);
});

app.post('/api/links', (req, res) => {
  const links = readLinks();
  const newLink = req.body;
  links.push(newLink);
  writeLinks(links);
  res.status(201).json(newLink);
});

app.put('/api/links/:id', (req, res) => {
  const links = readLinks();
  const id = req.params.id;
  const updatedLink = req.body;
  
  const index = links.findIndex(link => link._id === id);
  if (index !== -1) {
    links[index] = updatedLink;
    writeLinks(links);
    res.json(updatedLink);
  } else {
    res.status(404).json({ message: 'Link nicht gefunden' });
  }
});

app.delete('/api/links/:id', (req, res) => {
  const links = readLinks();
  const id = req.params.id;
  
  const filteredLinks = links.filter(link => link._id !== id);
  if (filteredLinks.length !== links.length) {
    writeLinks(filteredLinks);
    res.json({ message: 'Link gelöscht' });
  } else {
    res.status(404).json({ message: 'Link nicht gefunden' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
}); 