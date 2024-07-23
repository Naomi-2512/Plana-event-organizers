// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Events } from '../../../interfaces/interface';
// import { EventsService } from '../../../services/events.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-user-events',
//   standalone: true,
//   imports: [CommonModule,FormsModule,ReactiveFormsModule,],
//   templateUrl: './user-events.component.html',
//   styleUrl: './user-events.component.css'
// })
// export class UserEventsComponent {
//   events:Events[] = [];

//   constructor(private eventService:EventsService){
//     this.displayEvents();
//   }

//   displayEvents(){
//     this.eventService.getAllEvents().subscribe(res=>{
//       this.events = res.events;
//     })
//   }

  
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Events } from '../../../interfaces/interface';
import { EventsService } from '../../../services/events.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent {
  events: Events[] = [];
  selectedEvent: Events | null = null;

  constructor(private eventService: EventsService) {
    this.displayEvents();
  }

  displayEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.events;
    });
  }

  viewEvent(eventId: string) {
    this.eventService.getEventByEventId(eventId).subscribe(res => {
      this.selectedEvent = res.event;
    });
  }

  cancelView() {
    this.selectedEvent = null;
  }

}

