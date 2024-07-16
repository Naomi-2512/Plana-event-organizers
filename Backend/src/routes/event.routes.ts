import { Router } from 'express';
import { EventsController } from '../controllers/event.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const eventsRouter = new EventsController();
const router = Router();

router.post('/create', verifyTokens, eventsRouter.createEvent);

router.put('/update', verifyTokens, eventsRouter.updateEvent);

router.put('/updateStatus', verifyTokens, eventsRouter.updateEventStatusByAdmin);

router.put('/updateAllStatuses', verifyTokens, eventsRouter.updateAllEventStatusByAdmin);

router.get('/oneEvent', verifyTokens, eventsRouter.getEventByEventId);

router.get('/allEvents', verifyTokens, eventsRouter.getAllEvents);

router.delete('/delete', verifyTokens, eventsRouter.deleteEvent);

export default router;
