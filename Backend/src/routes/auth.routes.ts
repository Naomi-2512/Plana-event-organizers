import { Router } from 'express';
import { loginAttendee } from '../controllers/auth.controller';

const authRouter = Router();
authRouter.put('/login', loginAttendee);

export default authRouter;
