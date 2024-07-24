import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logins, Users } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://localhost:3000/users';
 

  constructor(private http: HttpClient) { }

  getAuthorizationToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
  
  registerUser(user: Users) {
    return this.http.post<{error?: string, message?: string}>(`${this.baseUrl}/create`, user, )
  }

  loginUser(login: Logins) {
    return this.http.put<{error?: string, message?: string,token?:string,userRole?:string}>(`http://localhost:3000/auth/login`, login)
  }

  updateUser(user:Users){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/update`, user,{headers:this.getAuthorizationToken()})
  }

  getAllUsers(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/allUsers`, {headers:this.getAuthorizationToken()})
  }

  getapproveManagers(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/allManagers`, {headers:this.getAuthorizationToken()})
  }

  getUserById(){
    return this.http.get<{error?:string,message?:string,user:Users[]}>( `${this.baseUrl}/user-id`, {headers:this.getAuthorizationToken()})
  }

  //getting managers
  getUserByRole(){
    return this.http.get<{error?:string,message?:string,users:Users[]}>( `${this.baseUrl}/user-role`, {headers:this.getAuthorizationToken()})
  }

  //approving managers
  updateAllUsersRoleByAdmin(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateAll`,{}, {headers:this.getAuthorizationToken()})
  }

  softDeleteUser(userId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/delete/${userId}`, {headers:this.getAuthorizationToken()})
  }

  updateuserRoleByAdmin(userId:string){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/updateadmin/${userId}`,{}, {headers:this.getAuthorizationToken()})
  }

  retrieveDeletedUser(userId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/getUser/:${userId}`, {headers:this.getAuthorizationToken()})
  }

  retrieveAllDeletedUsers(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/getUsers`, {headers:this.getAuthorizationToken()})
  }
}
