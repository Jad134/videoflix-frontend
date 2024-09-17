import { Component, inject, Input } from '@angular/core';
import { LoginFooterComponent } from "../login-footer/login-footer.component";
import { LoginHeaderComponent } from "../login-header/login-header.component";
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.scss',
    imports: [LoginFooterComponent, LoginHeaderComponent, FormsModule, CommonModule, RouterModule]
})
export class LoginDialogComponent {
    sharedService = inject(SharedService);
    authServie = inject(AuthenticationService);
    password: any;
    mailOrPasswordWrong: boolean = false;
    loading :boolean = false;
    hideLogInButton = true;
    isPasswordVisible: boolean = false;

    constructor(private router: Router) {}


    /**
     * This function try to login. If mail or password is wrong set the mailorpw variable true to show the error
     */
    async logIn() {
        this.loading = true;
        this.authServie.login(this.sharedService.currentMail, this.password)
        this.authServie.getLogInStatus().subscribe((status: boolean) => {
            if (status) {
                this.mailOrPasswordWrong = true;
                console.log(this.mailOrPasswordWrong);
                this.loading = false;
            }
        });


    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
      }
}
