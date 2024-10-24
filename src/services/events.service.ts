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

export async function updateEvent(json: Partial<custom_event> & { id: number }): Promise<custom_event | null> {
    const db = await openDb();
    try {
        const existingEvent = await getEventById(json.id);
        if (!existingEvent) {
            return null;
        }

        const updatedEvent = { ...existingEvent, ...json };
        const { id, title, description, datetime, location } = updatedEvent;

        await db.run(`UPDATE events SET title=?, description=?, datetime=?, location=? WHERE id=?`,
            [title, description, datetime.toISOString(), location, id]);

        await db.close();
        return updatedEvent as custom_event;
    } catch (error) {
        await db.close();
        console.error('Error updating event:', error);
        return null;
    }
}

export async function deleteEvent(id: number): Promise<boolean> {
    const db = await openDb();
    try {
        const result = await db.run('DELETE FROM events WHERE id = ?', [id]);
        await db.close();
        // Check if any row was affected by the DELETE operation
        return result && result.changes ? result.changes > 0 : false;
    } catch (error) {
        await db.close();
        console.error('Error deleting event:', error);
        return false;
    }
}