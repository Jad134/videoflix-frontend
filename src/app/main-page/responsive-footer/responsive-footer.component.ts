import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-responsive-footer',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './responsive-footer.component.html',
  styleUrl: './responsive-footer.component.scss'
})
export class ResponsiveFooterComponent {
  showUserActions = false;
  authService = inject(AuthenticationService)
  @Output() showFavoritesChanged = new EventEmitter<boolean>()
  showFavorites = false;

  constructor(private router: Router){}

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
   * Open the route in a new tab (for legal notice pages) 
   */
  openInNewTab(route: string) {
    const url = this.router.createUrlTree([route]).toString();
    window.open(url, '_blank');
  }


  logout() {
    this.authService.logout()
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
