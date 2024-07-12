import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';
import { UserTopbarComponent } from '../user-topbar/user-topbar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet,UserSidebarComponent,UserTopbarComponent,UserProfileComponent,RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
