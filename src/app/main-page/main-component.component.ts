import { Component, inject } from '@angular/core';
import { MainHeaderComponent } from "./main-header/main-header.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { VideosComponent } from "./videos/videos.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CommonModule } from '@angular/common';
import { ResponsiveFooterComponent } from "./responsive-footer/responsive-footer.component";

@Component({
    selector: 'app-main-component',
    standalone: true,
    templateUrl: './main-component.component.html',
    styleUrl: './main-component.component.scss',
    imports: [MainHeaderComponent, VideosComponent, FavoritesComponent, CommonModule, ResponsiveFooterComponent]
})
export class MainComponentComponent {
    authServiece = inject(AuthenticationService);
    showFavorites = false;

    constructor(private router: Router) {
        if (!this.authServiece.userLoggedIn) {
            this.router.navigate(['/login']);
        }
    }


    /**
     * 
     * @param show boolean for display or hide the favorites/videos component
     */
    onShowFavoritesChanged(show: boolean): void {
        this.showFavorites = show;
    }

}
