// Importing necessary modules
import express from 'express';
import eventRoutes from './routes/events.routes.js';
import {initializeDatabase} from "./database/database";

// Initialize the app
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Setting up routes
app.use('/events', eventRoutes);

app.get('/initialize', async (req,res) =>{
    let db = await initializeDatabase()
    if (db) {
        res.status(200).json({message: 'database initialized successfully'});
    }
    else {
        res.status(500).json({message: 'Failed to initialize database'});
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});