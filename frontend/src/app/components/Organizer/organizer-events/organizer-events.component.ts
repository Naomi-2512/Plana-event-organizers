import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-organizer-events',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './organizer-events.component.html',
  styleUrl: './organizer-events.component.css'
})
export class OrganizerEventsComponent {
  showForm = "none";
  display = {};
  events:any[] = [];

  constructor(){}

  ngOnInit():void {
    this.events.push(
      {
        image:"zain.jpeg",
        title:"A musical concert",
        location:"Turkey",
        duration:"4 days",
        amount:"$1000"
      },
      {
        image:"girls.png",
        title:"A girls hangout",
        location:"Goshens",
        duration:"2 days",
        amount:"$100"
      },
      {
        image:"beach.jpeg",
        title:"Beach Party",
        location:"Mombasa",
        duration:"4 days",
        amount:"$100"
      },
      {
        image:"tyla.jpg",
        title:"A music Concert",
        location:"Instabul",
        duration:"4 days",
        amount:"$1000"
      },
      {
        image:"men.jpeg",
        title:"Mens Conference",
        location:"Nakuru",
        duration:"6 days",
        amount:"$100"
      },
  
    );
  }
  toggleForm() {
    this.showForm = this.showForm === "none"? "flex" : "none"; 
    this.display = {
      "display": this.showForm
    }
  }
}
