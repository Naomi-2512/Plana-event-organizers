import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users:any[] = [];

  constructor(){}

  ngOnInit():void {
    this.users.push(
      {
        image:"guyy.jpeg",
        name:"Zayn",
        Email:"zayn@gmail.com",
        phoneNumber:"0176543290",
        role:"Attendee",
      },
      {
        image:"guy.jpeg",
        name:"Ryan",
        Email:"ryan@gmail.com",
        phoneNumber:"0786554213",
        role:"Organizer",
      },
      {
        image:"girly.jpeg",
        name:"Olivia",
        Email:"olivia@gmail.com",
        phoneNumber:"0111232403",
        role:"Attendee",
      },
      {
        image:"girrl.jpeg",
        name:"Tyla",
        Email:"tyla@gmail.com",
        phoneNumber:"0786123441",
        role:"organizer",
      },
  
    );
  }
}
