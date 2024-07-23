import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Events } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-pending',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-pending.component.html',
  styleUrl: './admin-pending.component.css'
})
export class AdminPendingComponent { 
  events:Events[] = [];

  constructor(private eventService:EventsService){
    this.displayEvents();
  }

  displayEvents(){
    this.eventService.getAllEvents().subscribe(res=>{
      this.events = res.events;
    })
  }

  approveEvents(eventId:string){
    this.eventService.updateEventStatusByAdmin(eventId).subscribe(res=>{
      console.log(res);
      
    })
  }
}
