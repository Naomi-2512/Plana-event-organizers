import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from '../admin-topbar/admin-topbar.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet,AdminSidebarComponent,AdminTopbarComponent,RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
