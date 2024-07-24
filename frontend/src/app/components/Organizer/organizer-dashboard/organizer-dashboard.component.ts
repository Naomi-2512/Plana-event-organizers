import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookings, Events, Users } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';
import { UsersService } from '../../../services/users.service';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.css'
})
export class OrganizerDashboardComponent {
  events:Events[] = [];
  bookedUsers:Users[] = [];
  bookings:Bookings[] = [];
  
  selectedEvent: Events | null = null;

  constructor(private eventService:EventsService, private userService:UsersService,private bookService:BookingsService){
    this.displayEvents();
    this.displayBookedUsers();

  }

  displayEvents(){
    this.eventService.getEventByUserId().subscribe(res=>{
      this.events = res.events;
    })
  }

  displayBookedUsers(){
    this.bookService.getBookedUsers().subscribe(res=>{
      this.bookedUsers = res.users;
    })
  }

  onCardClick(event: Events) {
    this.selectedEvent = event;
  }

  updateBookStatus(bookId:string){
    this.bookService.updateBookStatus(bookId).subscribe(res=>{
      console.log(res);
      
    })
  }
}
