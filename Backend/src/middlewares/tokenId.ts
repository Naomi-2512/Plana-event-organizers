import { Tokens } from "../interfaces/interface";
import { extendedRequest } from "./verifyToken";

export const getIdFromToken = async (req: extendedRequest):Promise<string> => {
  
    let info = req.info as Tokens;
  
    if (!info) {
      return ""
    }
    else {
      const userId = info.userId;
  
      return userId
    }
  
  }
  
  