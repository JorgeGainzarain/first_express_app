import { Router } from 'express';
import { addEvent, getEventById, getAllEvents } from "../services/events.service";

const router = Router();


router.get('/', async (req, res) => {
    let events = await getAllEvents();
    res.send(events);
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let event = await getEventById(id);
    if (!event) res.status(404).send({ error: `Event with id ${id} not found` });
    res.send(event);
})

router.post('/:id', async (req, res) => {

    let json = req.body
    if (json === null) res.status(400).send({ error: 'No event data provided' });
    json.id = req.params.id;

    console.log(json)

    try {
        let event = await addEvent(json)
        res.status(201).json({
            message: `Event with id ${event.id} created successfully`
        });
    } catch (error : any) {
        console.error(error.message)
        res.status(500).json({
            error: 'Failed to create event',
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    let json = req.body
    if (json === null) res.status(400).send({ error: 'No event data provided' });
    json.id = req.params.id;



})

export default router;