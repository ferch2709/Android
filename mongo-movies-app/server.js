const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // <-- ESTA LÍNEA SOLUCIONA EL ECONNREFUSED

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let mongoClient = null;
let currentDb = null;

// Endpoint: Login / Conexión a MongoDB
app.post('/api/connect', async (req, res) => {
    const { uri, dbName } = req.body;
    if (!uri) return res.status(400).json({ success: false, message: 'La URI es obligatoria' });

    try {
        if (mongoClient) await mongoClient.close();
        
        // Limpiamos espacios accidentales
        const cleanUri = uri.trim();
        mongoClient = new MongoClient(cleanUri);
        await mongoClient.connect();

        const targetDb = dbName && dbName.trim() !== '' ? dbName.trim() : 'sample_mflix';
        currentDb = mongoClient.db(targetDb);
        await currentDb.command({ ping: 1 });

        console.log(` Conectado exitosamente a: ${targetDb}`);
        res.json({ success: true, message: `Conectado a ${targetDb}` });
    } catch (error) {
        console.error(" ERROR DE MONGODB:", error.message);

        if (mongoClient) await mongoClient.close();
        mongoClient = null;
        currentDb = null;
        res.status(401).json({ success: false, message: 'Error de conexión: ' + error.message });
    }
});

// Endpoint: Obtener lista de películas
app.get('/api/movies', async (req, res) => {
    if (!currentDb) return res.status(401).json({ error: 'No conectado' });
    try {
        const movies = await currentDb.collection('movies')
            .find({}, { projection: { title: 1, year: 1, poster: 1, genres: 1, 'imdb.rating': 1 } })
            .limit(24)
            .toArray();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Detalle extenso de una película
app.get('/api/movies/:id', async (req, res) => {
    if (!currentDb) return res.status(401).json({ error: 'No conectado' });
    try {
        const movie = await currentDb.collection('movies').findOne({ _id: new ObjectId(req.params.id) });
        if (!movie) return res.status(404).json({ error: 'Película no encontrada' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Servidor activo en: http://localhost:${PORT}`));