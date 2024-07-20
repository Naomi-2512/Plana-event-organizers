import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logins, Users } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://localhost:3000/users';
  token = new HttpHeaders({
    'Authorisation': `Bearer ${localStorage.getItem('token') as string}`
  })

  constructor(private http: HttpClient) { }
  // {headers: this.token}
  registerUser(user: Users) {
    return this.http.post<{error?: string, message?: string}>(`${this.baseUrl}/create`, user, )
  }

  loginUser(login: Logins) {
    return this.http.put<{error?: string, message?: string,token?:string,userRole?:string}>(`http://localhost:3000/auth/login`, login)
  }

  updateUser(user:Users){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/update`, user,{headers:this.token})
  }

  getAllUsers(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/allUsers`, {headers:this.token})
  }

  getUserById(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/user-id`, {headers:this.token})
  }

  //getting managers
  getUserByRole(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/user-role`, {headers:this.token})
  }

  //approving admins
  updateAllUsersRoleByAdmin(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateAll`, {headers:this.token})
  }

  softDeleteUser(userId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/delete/:${userId}`, {headers:this.token})
  }

  retrieveDeletedUser(userId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/getUser/:${userId}`, {headers:this.token})
  }

  retrieveAllDeletedUsers(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/getUsers`, {headers:this.token})
  }
}
