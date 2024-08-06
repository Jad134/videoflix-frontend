import { Component, inject } from '@angular/core';
import { MainHeaderComponent } from "./main-header/main-header.component";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-main-component',
    standalone: true,
    templateUrl: './main-component.component.html',
    styleUrl: './main-component.component.scss',
    imports: [MainHeaderComponent]
})
export class MainComponentComponent {
    authServiece = inject(AuthenticationService);

    constructor(private router: Router) {
        if (!this.authServiece.userLoggedIn){
            this.router.navigate(['/login']);
        }
    }
 
    logout(){
        this.authServiece.logout()
    }
}
