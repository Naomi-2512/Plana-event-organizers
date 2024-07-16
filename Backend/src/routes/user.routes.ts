import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {verifyTokens} from '../middlewares/verifyToken';

const userRouter = new UserController();
const router = Router();


router.post('/create', userRouter.createUser);

router.put('/update', verifyTokens, userRouter.updateUser);

router.get('/allUsers', verifyTokens, userRouter.getAllUsers);

router.get('/user-id', verifyTokens, userRouter.getUserById);

router.get('/user-role', verifyTokens, userRouter.getUserByRole);

router.put('/updateAll', verifyTokens, userRouter.updateAllUsersRoleByAdmin);

router.delete('/delete', verifyTokens, userRouter.softDeleteUser);

router.put('/getUser', verifyTokens, userRouter.retrieveDeletedUser);

router.get('/getUsers', verifyTokens, userRouter.retrieveAllDeletedUsers);

export default router;
