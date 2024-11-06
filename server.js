// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create an endpoint to securely provide the API key to the frontend
app.get('/api/config', (req, res) => {
    res.json({
        apiKey: process.env.GEMINI_API_KEY
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});