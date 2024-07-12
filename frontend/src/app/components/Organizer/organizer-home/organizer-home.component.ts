import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrganizerSidebarComponent } from '../organizer-sidebar/organizer-sidebar.component';
import { OrganizerTopbarComponent } from '../organizer-topbar/organizer-topbar.component';

@Component({
  selector: 'app-organizer-home',
  standalone: true,
  imports: [RouterOutlet,OrganizerSidebarComponent,OrganizerTopbarComponent,RouterLink],
  templateUrl: './organizer-home.component.html',
  styleUrl: './organizer-home.component.css'
})
export class OrganizerHomeComponent {

}
