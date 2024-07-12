import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-booked',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user-booked.component.html',
  styleUrl: './user-booked.component.css'
})
export class UserBookedComponent {
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
}
