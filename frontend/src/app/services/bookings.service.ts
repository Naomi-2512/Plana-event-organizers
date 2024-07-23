import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings, Events, Users } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  baseUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) { }

  getAuthorizationToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  createBooking(book:Bookings,eventId:string){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/create/:${eventId}`, book,{headers:this.getAuthorizationToken()})
  }

  updateBooking(book:Bookings,bookId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/update/${bookId}`, book,{headers:this.getAuthorizationToken()})
  }

  getAllBookingsByUserId(){
    return this.http.get<{error?:string,message?:string,events:Events[],bookings:Bookings[]}>( `${this.baseUrl}/allBookings`, {headers:this.getAuthorizationToken()})
  }

  deleteBooking(bookId:string){
    return this.http.delete<{error?:string,message?:string}>( `${this.baseUrl}/delete/${bookId}`,{headers:this.getAuthorizationToken()})
  }

  getBookedUsers(){
    return this.http.get<{error?:string,message?:string,users:[]}>( `${this.baseUrl}/bookedUsers`, {headers:this.getAuthorizationToken()})
  }

  getApprovedBookedUsers(){
    return this.http.get<{error?:string,message?:string,users: Users[],events:Events[]}>( `${this.baseUrl}/confirmedBookings`, {headers:this.getAuthorizationToken()})
  }

  updateBookStatus(bookId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateStatus/${bookId}`,{headers:this.getAuthorizationToken()})
  }
}
