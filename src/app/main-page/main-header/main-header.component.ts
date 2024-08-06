import { Component, inject, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor() { }
  showUserActions = false;
  animationState = '';

  authService = inject(AuthenticationService)
  @ViewChild('logOutDialog') logOutDialog: any;

  logout() {
    this.authService.logout()
  }


 
  /**
   * Toggle the variable for show the popup to logout and policy
   */
  toggleUserActions() {
    if (this.showUserActions) {
      this.showUserActions = false;
    } else {
      this.showUserActions = true;
    }
  }
}
