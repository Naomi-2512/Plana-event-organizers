import { Router } from 'express';
import { BookingController } from '../controllers/bookings.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const bookingRouter = new BookingController();
const router = Router();

router.post('/create', verifyTokens, bookingRouter.createBooking);

router.put('/update', verifyTokens, bookingRouter.updateBooking);

router.delete('/delete', verifyTokens, bookingRouter.deleteBooking);

router.get('/allBookings', verifyTokens, bookingRouter.getAllBookingsByUserId);

router.get('/bookedUsers', verifyTokens, bookingRouter.getBookedUsers);

router.put('/updateStatus', verifyTokens, bookingRouter.updateBookStatus);

export default router;
