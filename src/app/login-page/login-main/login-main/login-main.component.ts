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

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss'
})
export class LoginMainComponent {
  authService = inject(AuthenticationService)
  email: any;


  checkIfMailExist() {
    this.authService.checkUsername(this.email)

  }
}
