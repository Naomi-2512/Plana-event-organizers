import { loginUser } from "../services/auth.service";
import { Request, Response } from "express";

export const loginAttendee = async (req: Request, res: Response) => {
  
    try {
      let response = await loginUser(req.body);
  
      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({error})
    }
  
  }