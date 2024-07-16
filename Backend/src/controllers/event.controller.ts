import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { getIdFromToken } from "../middlewares/tokenId";
import { eventSchema } from "../validators/event.validators";
const eventservice = new EventService()

export class EventsController {

  async createEvent(req: Request, res: Response) {

    try {
      let userId = await getIdFromToken(req);

      if (userId = '') {
        return res.status(501).json({
          error: "Could not get id from the token"
        })
      }
  
      let { error } = eventSchema.validate(req.body);
  
      if (error) {
        return res.status(401).json({error})
      }
  
      let response = await eventservice.createEvent(userId, req.body);
  
      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateEvent(req: Request, res: Response) {

    try {
      let userId = await getIdFromToken(req);

      if (userId = '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let { error } = eventSchema.validate(req.body);

      if (error) {
        return res.status(401).json({error})
      }

      let response = await eventservice.updateEvent(req.params.event_id, userId, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateEventStatusByAdmin(req: Request, res: Response) {

    try {

      let response = await eventservice.updateEventStatusByAdmin(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateAllEventStatusByAdmin(req: Request, res: Response) {

    try {

      let response = await eventservice.updateAllEventStatusByAdmin();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async getEventByEventId(req: Request, res: Response) {

    try {

      let response = await eventservice.getEventByEventId(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async getAllEvents(req: Request, res: Response) {

    try {

      let response = await eventservice.getAllEvents();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async deleteEvent(req: Request, res: Response) {

    try {

      let response = await eventservice.deleteEvent(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

}