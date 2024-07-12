import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pending.component.html',
  styleUrl: './admin-pending.component.css'
})
export class AdminPendingComponent {

  events:any[] = [];

  constructor(){}

  ngOnInit():void {
    this.events.push(
      {
        image:"zain.jpeg",
        title:"A musical concert",
        location:"Turkey",
        duration:"4 days",
        amount:"$1000",
        organizer:"Ryan"
      },
      {
        image:"girls.png",
        title:"A girls hangout",
        location:"Goshens",
        duration:"2 days",
        amount:"$100",
        organizer:"Nakeez"
      },
      {
        image:"beach.jpeg",
        title:"Beach Party",
        location:"Mombasa",
        duration:"4 days",
        amount:"$100",
        organizer:"Kristen"
      },
    );
  }
}
