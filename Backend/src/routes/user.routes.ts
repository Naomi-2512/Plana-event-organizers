import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {verifyTokens} from '../middlewares/verifyToken';

const userContoller = new UserController();
const userRouter = Router();


userRouter.post('/create', userContoller.createUser);

userRouter.put('/update', verifyTokens, userContoller.updateUser);

userRouter.get('/allUsers', verifyTokens, userContoller.getAllUsers);

userRouter.get('/allManagers',verifyTokens, userContoller.getapproveManagers);

userRouter.get('/user-id', verifyTokens, userContoller.getUserById);

userRouter.get('/user-role', verifyTokens, userContoller.getUserByRole);

userRouter.put('/updateAll', verifyTokens, userContoller.updateAllUsersRoleByAdmin);

userRouter.post('/updateadmin/:userId', verifyTokens, userContoller.updateuserRoleByAdmin);

userRouter.put('/delete/:userId', verifyTokens, userContoller.softDeleteUser);

userRouter.put('/getUser/:userId', verifyTokens, userContoller.retrieveDeletedUser);

userRouter.put('/getUsers', verifyTokens, userContoller.retrieveAllDeletedUsers);

export default userRouter;
