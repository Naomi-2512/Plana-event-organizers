import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent {
  events:any[] = [];

  constructor(){}

  ngOnInit():void {
    this.events.push(
       {
      image:"zain.jpeg",
      title:"A musical concert",
      description:"Rocking with Zayn",
      duration:"4 days",
      amount:"$1000"
    },
    {
      image:"girls.png",
      title:"A girls hangout",
      description:"Join fellow girls 18-26 years",
      duration:"2 days",
      amount:"$100"
    },
    {
      image:"beach.jpeg",
      title:"Beach Party",
      description:"Party to remember!!",
      duration:"4 days",
      amount:"$100"
    },
    {
      image:"tyla.jpg",
      title:"A music Concert",
      description:"Rocking with Tyla",
      duration:"4 days",
      amount:"$1000"
    },
    {
      image:"men.jpeg",
      title:"Mens Conference",
      description:"Interaction with great men",
      duration:"6 days",
      amount:"$100"
    },
  
    );
  }
}
