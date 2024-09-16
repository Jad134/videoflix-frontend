import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatButtonModule, MatMenuModule,RouterModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor(private router: Router) { }
  showUserActions = false;
  animationState = '';
  showFavorites = false;
  @Output() showFavoritesChanged = new EventEmitter<boolean>();

  authService = inject(AuthenticationService)
  videoService = inject(VideoService)
  @ViewChild('logOutDialog') logOutDialog: any;

  logout() {
    this.authService.logout()
  }


   /**
   * Open the route in a new tab (for legal notice pages) 
   */
  openInNewTab(route: string) {
    const url = this.router.createUrlTree([route]).toString();
    window.open(url, '_blank');
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


  /**
   * Set the variables for favorites to show the color at the header link and display the favorites with output
   */
  routeToFavorites(): void {
    this.showFavorites = true;
    this.showFavoritesChanged.emit(true); 
  }

   /**
   * Set the variables for favorites to show the color at the header link and hide the favorites and show all videos with output
   */
  routeToHome(): void {
    this.showFavorites = false;
    this.showFavoritesChanged.emit(false);
  }
}
