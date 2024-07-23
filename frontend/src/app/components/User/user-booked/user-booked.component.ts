import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookings, Events } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-user-booked',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user-booked.component.html',
  styleUrl: './user-booked.component.css'
})
export class UserBookedComponent {
  errorMessage:string = '';
  success:string = '';
  display = {};
  events:Events[] = [];
  bookings:Bookings[] = [];
  bookId!:Bookings;

  constructor(private eventService:EventsService, private bookService:BookingsService){
    this.displayBookings();
  }

  displayBookings(){
    this.bookService.getAllBookingsByUserId().subscribe(res=>{
      this.events = res.events;
      this.bookings = res.bookings;
    })
  }

  cancelBooking(bookId:string){
    this.bookService.deleteBooking(bookId).subscribe(res=>{
      if(res.error ){
        this.errorMessage = res.error;
        this.display = {
          'background-color':'red',
          'display':'flex'
        }
        setTimeout(()=>{
          this.errorMessage = '',
          this.display = {}
        },5000);
      }
      else if(res.message){
        this.success = res.message;
        this.display = {
          'background-color':'green',
          'display':'flex'
        }
        this.events = [];
        this.bookings = [];
        this.displayBookings();
        setTimeout(()=>{
          this.success = '',
          this.display = {}
        },2000)
      }

    })
  }
  
}
