import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-organizer-logout',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,RouterModule,],
  templateUrl: './organizer-logout.component.html',
  styleUrl: './organizer-logout.component.css'
})
export class OrganizerLogoutComponent {

}
