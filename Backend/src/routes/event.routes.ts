import { Router } from 'express';
import { EventsController } from '../controllers/event.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const eventsController = new EventsController();
const eventsRouter = Router();

eventsRouter.post('/create', verifyTokens, eventsController.createEvent);

eventsRouter.post('/update/:eventId', verifyTokens, eventsController.updateEvent);

eventsRouter.put('/updateStatus/:eventId', verifyTokens, eventsController.updateEventStatusByAdmin);

eventsRouter.put('/updateAllStatuses', verifyTokens, eventsController.updateAllEventStatusByAdmin);

eventsRouter.get('/oneEvent/:eventId', verifyTokens, eventsController.getEventByEventId);

eventsRouter.get('/anEvent', verifyTokens, eventsController.getEventByUserId);

eventsRouter.get('/allEvents', verifyTokens, eventsController.getAllEvents);

eventsRouter.get('/approvedEvents', verifyTokens, eventsController.getApprovedEvents);

eventsRouter.delete('/delete/:eventId', verifyTokens, eventsController.deleteEvent);

export default eventsRouter;
