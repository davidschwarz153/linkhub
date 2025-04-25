const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/operations-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Link Schema
const linkSchema = new mongoose.Schema({
  name: String,
  url: String,
  category: String,
  _id: String
});

const Link = mongoose.model('Link', linkSchema);

// Routes
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/links', async (req, res) => {
  try {
    const link = new Link(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/links/:id', async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/links/:id', async (req, res) => {
  try {
    await Link.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Link gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
}); 