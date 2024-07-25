import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Bookings, Events, Users } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent {
  event:Events = {} as Events;
  eventId:string = '';
  events:Events[] = [];
  styles = {
    'display': 'none'
  };
  errorMessage:string = '';
  success:string = '';
  display = {};
  displays = {
    'display': 'none'
  };

  constructor(private eventService:EventsService,private bookService:BookingsService){
    this.displayEvents();
  }

  displayEvents(){
    this.eventService.getAllEvents().subscribe(res=>{
      this.events = res.events;
    })
  }

  toogleViewOne(){
    if(this.displays.display == 'none'){
      this.displays = {
        'display': 'flex'
      }
    }
    else{
      this.displays = {
        'display': 'none'
      }
      this.displayEvents()
    }
  }

  toggleForm(eventId:string){
    this.eventId = eventId;
    console.log(eventId);
    
    if(this.styles.display == 'none'){
      this.styles = {
        'display': 'flex'
      }
    }
    else{
      this.styles = {
        'display': 'none'
      }
    }
  }

  submitForm(book:Bookings,eventId:string){
    this.bookService.createBooking(book,eventId).subscribe(res=>{
      if(res.error ){
        this.errorMessage = res.error;
        this.display = {
          'background-color':'red',
          'display':'flex'
        }
        setTimeout(()=>{
          this.errorMessage = '',
          this.display = {}
        },5000)
      }
      else if(res.message){
        this.success = res.message;
        this.display = {
          'background-color':'green',
          'display':'flex'
        }
        this.toggleForm('success')
        setTimeout(()=>{
          this.success = '',
          this.display = {}
        },2000)
      }
    })
  }

  viewOne(eventId:string){
    this.events = [];
    this.eventService.getEventByEventId(eventId).subscribe(res=>{
      let myEvents = res.event as Events[];
      this.event = myEvents[0];
      
      this.toogleViewOne();
    })
  }
}



