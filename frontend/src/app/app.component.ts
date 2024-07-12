import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { OrganizerHomeComponent } from './components/Organizer/organizer-home/organizer-home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetComponent } from './components/reset/reset.component';
import { UserDashboardComponent } from './components/User/user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdminHomeComponent,LandingPageComponent,LoginComponent,OrganizerHomeComponent,RegistrationComponent,ResetComponent,UserDashboardComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
