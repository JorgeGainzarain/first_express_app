import custom_event from '../models/event.model'
import {openDb} from '../database/database'

export async function addEvent(json: JSON) :Promise<custom_event> {
    const db = await openDb();
    const event = custom_event.fromJson(json);
    await db.run(`INSERT INTO events (id, title, description, datetime, location) VALUES (?,?,?,?,?)`,
        [event.id, event.title, event.description, event.datetime.toISOString(), event.location]);
    await db.close();
    return event;
}

export async function getAllEvents() : Promise<custom_event[]> {
    const db = await openDb();
    const rows = await db.all('SELECT * FROM events');
    await db.close();
    return rows.map(row => custom_event.fromJson(row));
}

export async function getEventById(id: number) : Promise<custom_event | null> {
    const db = await openDb();
    const row = await db.get('SELECT * FROM events WHERE id =?', [id]);
    await db.close();
    return row? custom_event.fromJson(row) : null;
}