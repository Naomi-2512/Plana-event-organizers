import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-users',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './organizer-users.component.html',
  styleUrl: './organizer-users.component.css'
})
export class OrganizerUsersComponent {
  users:any[] = [];

  constructor(){}

  ngOnInit():void {
    this.users.push(
      {
        image:"guyy.jpeg",
        name:"Zayn",
        Email:"zayn@gmail.com",
        phoneNumber:"0176543290",
        Event:"Concert"
      },
      {
        image:"guy.jpeg",
        name:"Ryan",
        Email:"ryan@gmail.com",
        phoneNumber:"0786554213",
        Event:"Mens conference"
      },
      {
        image:"girly.jpeg",
        name:"Olivia",
        Email:"olivia@gmail.com",
        phoneNumber:"0111232403",
        Event:"Beach party"
      },
      {
        image:"girrl.jpeg",
        name:"Tyla",
        Email:"tyla@gmail.com",
        phoneNumber:"0786123441",
        Event:"Girls hangout"
      },
  
    );
  }
}
