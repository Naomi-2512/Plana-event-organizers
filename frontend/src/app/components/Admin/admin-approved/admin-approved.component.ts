import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Events } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-admin-approved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-approved.component.html',
  styleUrl: './admin-approved.component.css'
})
export class AdminApprovedComponent {
  events:Events[] = [];

  constructor(private eventService:EventsService){
    this.getApprovedEvents();
  }

  getApprovedEvents(){
    this.eventService.getApprovedEvents().subscribe(res=>{
      this.events = res.events;
    })
  }
}
