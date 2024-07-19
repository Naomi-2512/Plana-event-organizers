import { Request, Response } from "express";
import { BookingService } from "../services/bookings.service";
import { getIdFromToken } from "../middlewares/tokenId";
const bookingService = new BookingService();

export class BookingController {

  async createBooking(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.createBooking(userId, req.params.eventId, req.body);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async updateBooking(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.updateBooking(req.params.bookId, userId, req.body);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async deleteBooking(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.deleteBooking(userId, req.params.bookId);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async getAllBookingsByUserId(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.getAllBookingsByUserId(userId);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }


  async getBookedUsers(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.getBookedUsers(userId);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async updateBookStatus(req: Request, res: Response) {

    try {

      let result = await bookingService.updateBookStatus(req.params.bookId);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }
  async getApprovedBookedUsers(req: Request, res: Response) {

    try {
      
      let userId = await getIdFromToken(req);

      if(userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await bookingService.getApprovedBookedUsers(userId);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

}