import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getAuthorizationToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  createEvent(event:Events){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/create`, event,{headers:this.getAuthorizationToken()})
  }

  updateEvent(event:Events,eventId:string){
    return this.http.post<{error?:string,message?:string}>( `${this.baseUrl}/update/${eventId}`, event,{headers:this.getAuthorizationToken()})
  }

  getAllEvents(){
    return this.http.get<{error?:string,message?:string,events:Events[]}>( `${this.baseUrl}/allEvents`, {headers:this.getAuthorizationToken()})
  }

  //approve an event
  updateEventStatusByAdmin(eventId:string){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateStatus/${eventId}`,{}, {headers:this.getAuthorizationToken()})
  }

  updateAllEventStatusByAdmin(){
    return this.http.put<{error?:string,message?:string}>( `${this.baseUrl}/updateAllStatuses`, {headers:this.getAuthorizationToken()})
  }

  getEventByEventId(eventId:string){
    return this.http.get<{error?:string,message?:string,event:Events[]}>( `${this.baseUrl}/oneEvent/${eventId}`, {headers:this.getAuthorizationToken()})
  }

  deleteEvent(eventId: string, String?: StringConstructor){
    return this.http.delete<{error?:string,message?:string,event:Events[]}>( `${this.baseUrl}/delete/${eventId}`, {headers:this.getAuthorizationToken()})
  }

  getApprovedEvents(){
    return this.http.get<{error?:string,message?:string,events:Events[]}>( `${this.baseUrl}/approvedEvents`, {headers:this.getAuthorizationToken()})
  }

  //get organizers event
  getEventByUserId(){
    return this.http.get<{error?:string,message?:string, events:Events[]}>( `${this.baseUrl}/anEvent`, {headers:this.getAuthorizationToken()})
  }
}
