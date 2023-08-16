const express = require('express');
const fetch = require('node-fetch'); // Importa node-fetch utilizando require
const app = express();
const port = 3000;

app.use(express.static('public'));

// Ruta para obtener información de la PokeAPI
app.get('/api/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de la PokeAPI' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
