import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseUrl = 'http://localhost:3000/events';
  token = new HttpHeaders({
    'Authorisation': `Bearer ${localStorage.getItem('token') as string}`
  })
  constructor(private http: HttpClient) { }

  createEvent(event:Events){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/create`, event,{headers:this.token})
  }

  updateEvent(event:Events,eventId:string){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/update/:${eventId}`, event,{headers:this.token})
  }

  getAllEvents(){
    return this.http.get<{error?:string,message?:string}>( `${this.baseUrl}/allEvents`, {headers:this.token})
  }

  //approve an event
  updateEventStatusByAdmin(eventId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateStatus/:${eventId}`, {headers:this.token})
  }

  updateAllEventStatusByAdmin(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateAllStatuses`, {headers:this.token})
  }

  getEventByEventId(eventId:string){
    return this.http.get<{error?:string,message?:string,event:Events[]}>( `${this.baseUrl}/oneEvent/:${eventId}`, {headers:this.token})
  }

  deleteEvent(eventId:string){
    return this.http.delete<{error?:string,message?:string,event:Events[]}>( `${this.baseUrl}/delete/:${eventId}`, {headers:this.token})
  }

  getApprovedEvents(){
    return this.http.get<{error?:string,message?:string}>( `${this.baseUrl}/approvedEvents`, {headers:this.token})
  }

  //get organizers event
  getEventByUserId(){
    return this.http.get<{error?:string,message?:string}>( `${this.baseUrl}/anEvent`, {headers:this.token})
  }
}
