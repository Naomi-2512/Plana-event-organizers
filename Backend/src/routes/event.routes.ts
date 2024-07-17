import { Router } from 'express';
import { EventsController } from '../controllers/event.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const eventsController = new EventsController();
const eventsRouter = Router();

eventsRouter.post('/create', verifyTokens, eventsController.createEvent);

eventsRouter.put('/update', verifyTokens, eventsController.updateEvent);

eventsRouter.put('/updateStatus', verifyTokens, eventsController.updateEventStatusByAdmin);

eventsRouter.put('/updateAllStatuses', verifyTokens, eventsController.updateAllEventStatusByAdmin);

eventsRouter.get('/oneEvent', verifyTokens, eventsController.getEventByEventId);

eventsRouter.get('/allEvents', verifyTokens, eventsController.getAllEvents);

eventsRouter.delete('/delete', verifyTokens, eventsController.deleteEvent);

export default eventsRouter;
