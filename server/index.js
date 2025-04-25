const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'links.json');

// Hilfsfunktionen für JSON-Datei
async function readLinks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Wenn die Datei nicht existiert, erstellen wir sie mit einem leeren Array
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
    return [];
  }
}

async function writeLinks(links) {
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
}

// Routes
app.get('/api/links', async (req, res) => {
  try {
    const links = await readLinks();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/links', async (req, res) => {
  try {
    const links = await readLinks();
    const newLink = {
      ...req.body,
      _id: Date.now().toString()
    };
    links.push(newLink);
    await writeLinks(links);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/links/:id', async (req, res) => {
  try {
    const links = await readLinks();
    const index = links.findIndex(link => link._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Link not found' });
    }
    links[index] = { ...links[index], ...req.body };
    await writeLinks(links);
    res.json(links[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/links/:id', async (req, res) => {
  try {
    const links = await readLinks();
    const filteredLinks = links.filter(link => link._id !== req.params.id);
    await writeLinks(filteredLinks);
    res.json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 