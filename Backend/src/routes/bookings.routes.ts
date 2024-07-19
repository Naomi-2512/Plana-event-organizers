import { Router } from 'express';
import { BookingController } from '../controllers/bookings.controller';
import { verifyTokens } from '../middlewares/verifyToken';

const bookingController = new BookingController();
const bookingRouter = Router();

bookingRouter.post('/create/:eventId', verifyTokens, bookingController.createBooking);

bookingRouter.put('/update/:bookId', verifyTokens, bookingController.updateBooking);

bookingRouter.delete('/delete/:bookId', verifyTokens, bookingController.deleteBooking);

bookingRouter.get('/allBookings', verifyTokens, bookingController.getAllBookingsByUserId);

bookingRouter.get('/bookedUsers', verifyTokens, bookingController.getBookedUsers);

bookingRouter.get('/confirmedBookings', verifyTokens, bookingController.getApprovedBookedUsers);

bookingRouter.put('/updateStatus/:bookId', verifyTokens, bookingController.updateBookStatus);

export default bookingRouter;
