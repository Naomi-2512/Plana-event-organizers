import { Component } from '@angular/core';
import { OrganizerProfileComponent } from '../organizer-profile/organizer-profile.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-sidebar',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,OrganizerSidebarComponent,OrganizerProfileComponent,RouterOutlet],
  templateUrl: './organizer-sidebar.component.html',
  styleUrl: './organizer-sidebar.component.css'
})
export class OrganizerSidebarComponent {

}
