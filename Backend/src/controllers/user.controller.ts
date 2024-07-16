import { getIdFromToken } from "../middlewares/tokenId";
import { UserService } from "../services/user.service";
import { userSchema } from "../validators/user.validators";
import { Request, Response } from "express";



let userService = new UserService;
export class UserController {

  async createUser(req: Request, res: Response) {

    try {

      let { error } = userSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error
        })
      }

      let response = await userService.createUser(req.body);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.json({
        error: error
      })
    }

  }

  async updateUser(req: Request, res: Response) {

    try {

      let { error } = userSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error
        })
      }


      let userId = await getIdFromToken(req);

      if (userId == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let response = await userService.updateUser(userId, req.body);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.json({
        error
      })
    }

  }

  async getAllUsers(req: Request, res: Response) {
    try {
      let response = await userService.getAllUsers();

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {

      let userId = await getIdFromToken(req);

      if (!userId) {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let response = await userService.getUserById(userId);

      return res.status(201).json(response)

    }
    catch (error) {
      return res.json({error})
    }
  }

  async getUserByRole(req: Request, res: Response) {
    try {
      let response = await userService.getUserByRole();

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

//   async updateRoleByAdmin(req: Request, res: Response) {
//     try {

//       let response = await userService.updateRoleByAdmin(req.params.userId);

//       return res.status(201).json(response);
//     }
//     catch (error) {
//       return res.json({ error });
//     }
//   }

  async updateAllUsersRoleByAdmin(req: Request, res: Response) {
    try {
      let response = await userService.updateAllUsersRoleByAdmin();

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

  async softDeleteUser(req: Request, res: Response) {
    try {

      let response = await userService.softDeleteUser(req.params.userId);

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

  async retrieveDeletedUser(req: Request, res: Response) {
    try {

      let response = await userService.retrieveDeletedUser(req.params.userId);

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

  async retrieveAllDeletedUsers(req: Request, res: Response) {
    try {
      let response = await userService.retrieveAllDeletedUsers();

      return res.status(201).json(response);
    }
    catch (error) {
      return res.json({ error });
    }
  }

}