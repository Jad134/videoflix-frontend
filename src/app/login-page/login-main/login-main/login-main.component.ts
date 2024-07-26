import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports:  [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss'
})
export class LoginMainComponent {

}
