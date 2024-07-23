import { v4 } from "uuid";
import { Bookings, Users } from "../interfaces/interface";
import { Helper } from "../DbHelper/dbHelper";
import lodash from "lodash";
import bcrypt from 'bcrypt';

export class UserService {
    async createUser(user:Users){
        let userId = v4(); 

        let hashedPassword = bcrypt.hashSync(user.password,13);

        let emailExists = (await Helper.query(`select * from Users where email = '${user.email}'`)).recordset;

        if (!lodash.isEmpty(emailExists)) {
           return {
            error: "Email already exists,login instead"
           } 
        }

        let phoneExists = (await Helper.query(`select * from Users where phoneNumber = '${user.phoneNumber}'`)).recordset;

        if (!lodash.isEmpty(phoneExists)) {
            return{
                error: "Phone number already exists"
            }
        }

        let result = (await Helper.execute('registerUser', {
            userId:userId,userName:user.userName,phoneNumber:user.phoneNumber,email:user.email,password:hashedPassword,profileImage:user.profileImage,location:user.location,userRole:user.userRole 
        })).rowsAffected;

        if (result[0] < 1) {
            return {
                error:"User not registered"
            }
        }
        else{
            return{
                message: "Account registered successfully"
            }
        }

    }

    async updateUser(userId:string, user:Users){
        let userExists = (await Helper.query(`select * from Users where userId ='${userId}'`)).recordset;

        if (userExists.length == 0) {
           return{
            error: "user does not exist"
           } 
        }
        else{
            let result = (await Helper.execute('updateUser',{
                userId:userExists[0].userId,userName:user.userName,phoneNumber:user.phoneNumber,email:user.email,profileImage:user.profileImage,location:user.location,
            })).rowsAffected;

            if (result[0] < 1){
                return {
                    error: "Error updating"
                }
            }
            else{
                return{
                    message:"updated successfully"
                }
            }
        }
    }

    async getAllUsers (){
        let result = (await Helper .query(`select * from Users`)).recordset;

        if (lodash.isEmpty(result)) {
           return{
            error:"Error fetching users"
           } 
        }
        else{
            return{
                message:"Users fetched successfully",
                users:result
            }
        }
    }

    async getUserById(userId:string){
        let result = ( await Helper.query(`select * from Users where userId = '${userId}'`)).recordset;

        if(lodash.isEmpty(result)){
            return{
                error: "User of this id does not exist"
            }
        }
        else{
            return{
                message:"user successfully retrieved",
                user:result
            }
        }
    }

    async getUserByRole(){
        let result = (await Helper.query("select * from Users where userRole = 'manager' "  )).recordset;

        if (lodash.isEmpty(result)) {
            return{
                error: "No users of that role"
            }
        }
        else{
            return{
                message:"Managers successfully fetched",
                users:result
            }
        }
    }

    async getUsersByEventId(eventId:string){

        let requiredUsers: string[] =[];
        let returnedUsers: Users[] = [];
        let finalUsers: Users[] = [];

        let bookedUsers:Bookings[] = (await Helper.query(`select * from Bookings where eventId = '${eventId}'`)).recordset;

        if (lodash.isEmpty(bookedUsers)) {
           return{
            error: "Event not yet booked"
           } 
        }
        else{
            for (let bookedUser of bookedUsers){
                requiredUsers.push(bookedUser.userId);
            }
            
            if (returnedUsers.length > 0) {
              for (let requiredUser of requiredUsers){
                let result = (await(this.getUserById(requiredUser)))as unknown as Users[];
                if (result) {
                  returnedUsers.push(result[0]);
                } 
              }
            }
            return{
              message: "Users successfully fetched",
              users: returnedUsers
            }
        }
    }
    async updateAllUsersRoleByAdmin() {
        let result = (await Helper.query(`update Users set isManager = 1 where userRole = 'manager'`)).rowsAffected;
    
        if (result[0] < 1) {
          return {
            error: "Unable to approve user to manager"
          }
        }
        else {
          return {
            message: "All managers approved successfully"
          }
        }
    }
    async softDeleteUser(userId: string) {

        let userExists = (await Helper.query(`select * from Users where userId = '${userId}'`)).recordset;
    
        if (userExists.length == 0) {
          return {
            error: "This user does not exist"
          }
        }
    
        let result = (await Helper.query(`update Users set isDeleted = 1 where userId = '${userId}'`)).rowsAffected;
    
        if (result[0] < 1) {
          return {
            error: "Unable to delete this user"
          }
        }
        else {
          return {
            message: "User deleted successfully"
          }
        }
    
    }
    async retrieveDeletedUser(userId: string) {

        let userExists = (await Helper.query(`select * from Users where userId = '${userId}'`)).recordset;
    
        if (userExists.length == 0) {
          return {
            error: "cannot find this user..."
          }
        }
    
        let result = (await Helper.query(`update Users set isDeleted = 0 where userId = '${userId}'`)).rowsAffected;
    
        if (result[0] < 1) {
          return {
            error: "Unable to retrieve this user"
          }
        }
        else {
          return {
            message: "User retrieved successfully"
          }
        }
    
    }
    async retrieveAllDeletedUsers() {

        let result = (await Helper.query(`update users set isDeleted = 0 where isDeleted = 1`)).rowsAffected;
    
        if (result[0] < 1) {
          return {
            error: "Unable to retrieve users"
          }
        }
        else {
          return {
            message: "All deleted users retrieved successfully"
          }
        }
    
    }
}