import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-topbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './user-topbar.component.html',
  styleUrl: './user-topbar.component.css'
})
export class UserTopbarComponent {

}
