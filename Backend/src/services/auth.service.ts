import dotenv from 'dotenv'
import { Logins } from '../interfaces/interface';
import { Helper } from '../DbHelper/dbHelper';
import lodash from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config()

export const loginUser = async (logins: Logins) => {
  
  let emailExists = (await Helper.query(`select * from Users where email = '${logins.email}'`)).recordset;

  if (lodash.isEmpty(emailExists)) {
    return {
      error: "The email does not exist..register instead"
    }
  }

  let hashedPassword = emailExists[0].password;

  let passwordMatches = bcrypt.compareSync(logins.password, hashedPassword);

  if (!passwordMatches) {
    return {
      error: "Incorrect Password Provided, Please try again"
    }
  }
  else {
    let token = jwt.sign(emailExists[0], process.env.SECRET_KEY as string, {
      expiresIn: '2h'
    });

    return {
      message: "Welcome Back,You have successfully logged in",
      token
    }
  }

}
