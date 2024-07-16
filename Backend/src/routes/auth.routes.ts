import { Router } from 'express';
import { loginAttendee } from '../controllers/auth.controller';

const router = Router();
router.post('/login', loginAttendee);

export default router;
