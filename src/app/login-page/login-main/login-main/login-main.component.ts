import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { LoginHeaderComponent } from "../../login-header/login-header.component";
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-main',
    standalone: true,
    templateUrl: './login-main.component.html',
    styleUrl: './login-main.component.scss',
    imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, LoginHeaderComponent]
})
export class LoginMainComponent {
  authService = inject(AuthenticationService);
  sharedService = inject(SharedService)
  email: any;
  loading :boolean = false;

  constructor(private router: Router){

  }

  /**
   * This function check, if the mail already exist at the database
   */
  async checkIfMailExist() {
    this.loading = true
    await this.authService.checkUsername(this.email).then(mailExist => {
        if (mailExist) {
          this.router.navigate(['login'])
            console.log("Die E-Mail ist bereits vergeben.");
            this.sharedService.currentMail = this.email;
            this.loading = false
        } else {
          this.router.navigate(['register'])
            console.log("Die E-Mail ist verfügbar.");
            this.sharedService.currentMail = this.email;
            this.loading = false
        }
    }).catch(error => {
        console.error('Error:', error);
        this.loading = false
    });
}
}
