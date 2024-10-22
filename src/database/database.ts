import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs/promises';

const databasePath = path.join(__dirname, '..', 'database', 'events.db');

// Function to initialize the database
export async function initializeDatabase(): Promise<Database> {
    try {
        // Ensure the directory exists
        await fs.mkdir(path.dirname(databasePath), { recursive: true });

        // Attempt to open a connection to the database
        const db = await open({
            filename: databasePath,
            driver: sqlite3.Database
        });

        // Check if the events table exists
        const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='events'");

        if (!tableExists) {
            // If the table doesn't exist, create it
            await db.exec(`
                CREATE TABLE events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    datetime TEXT NOT NULL,
                    location TEXT NOT NULL
                )
            `);
        }

        return db;
    } catch (err: any) {
        console.error('Error initializing the database:', err.message);
        throw err;
    }
}

export async function openDb(): Promise<Database> {
    return await open({
        filename: databasePath,
        driver: sqlite3.Database
    });
}