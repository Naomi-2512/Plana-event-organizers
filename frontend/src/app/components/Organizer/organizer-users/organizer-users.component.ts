import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Events, Users } from '../../../interfaces/interface';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-organizer-users',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './organizer-users.component.html',
  styleUrl: './organizer-users.component.css'
})
export class OrganizerUsersComponent {
  users:Users[] = [];
  events:Events[] = [];


  constructor(private bookService:BookingsService){
    this.approvedBookedUsers();
  }

  approvedBookedUsers(){
    this.bookService.getApprovedBookedUsers().subscribe(res=>{
      console.log(res);
      
      this.users = res.users;
      this.events = res.events;  
    })
  }
}
