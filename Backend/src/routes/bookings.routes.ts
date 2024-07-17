import { Router } from 'express';
import { BookingController } from '../controllers/bookings.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const bookingController = new BookingController();
const bookingRouter = Router();

bookingRouter.post('/create', verifyTokens, bookingController.createBooking);

bookingRouter.put('/update', verifyTokens, bookingController.updateBooking);

bookingRouter.delete('/delete', verifyTokens, bookingController.deleteBooking);

bookingRouter.get('/allBookings', verifyTokens, bookingController.getAllBookingsByUserId);

bookingRouter.get('/bookedUsers', verifyTokens, bookingController.getBookedUsers);

bookingRouter.put('/updateStatus', verifyTokens, bookingController.updateBookStatus);

export default bookingRouter;
