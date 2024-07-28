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

@Component({
    selector: 'app-login-main',
    standalone: true,
    templateUrl: './login-main.component.html',
    styleUrl: './login-main.component.scss',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, LoginHeaderComponent]
})
export class LoginMainComponent {
  authService = inject(AuthenticationService)
  email: any;

  constructor(private router: Router){

  }
  async checkIfMailExist() {
    await this.authService.checkUsername(this.email).then(mailExist => {
        if (mailExist) {
          this.router.navigate(['login'])
            console.log("Die E-Mail ist bereits vergeben.");
        } else {
            // Hier kannst du weiter verfahren, wenn die E-Mail noch verfügbar ist
            console.log("Die E-Mail ist verfügbar.");
        }
    }).catch(error => {
        console.error('Error:', error);
        // Optional: Behandle den Fehler hier
    });
}
}
