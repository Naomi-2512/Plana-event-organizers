import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings, Events, Users } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  baseUrl = 'http://localhost:3000/bookings';
  token = new HttpHeaders({
    'Authorisation': `Bearer ${localStorage.getItem('token') as string}`
  })
  constructor(private http: HttpClient) { }

  createBooking(book:Bookings,eventId:string){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/create/:${eventId}`, book,{headers:this.token})
  }

  updateBooking(book:Bookings,bookId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/update/:${bookId}`, book,{headers:this.token})
  }

  getAllBookingsByUserId(){
    return this.http.get<{error?:string,message?:string,events:Events[],bookings:Bookings[]}>( `${this.baseUrl}/allBookings`, {headers:this.token})
  }

  deleteBooking(bookId:string){
    return this.http.delete<{error?:string,message?:string}>( `${this.baseUrl}/delete/:${bookId}`,{headers:this.token})
  }

  getBookedUsers(){
    return this.http.get<{error?:string,message?:string,users:[]}>( `${this.baseUrl}/bookedUsers`, {headers:this.token})
  }

  getApprovedBookedUsers(){
    return this.http.get<{error?:string,message?:string,users: Users[],events:Events[]}>( `${this.baseUrl}/confirmedBookings`, {headers:this.token})
  }

  updateBookStatus(bookId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateStatus/:${bookId}`,{headers:this.token})
  }
}
