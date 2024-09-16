import { Component, Input } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-header',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './login-header.component.html',
  styleUrl: './login-header.component.scss'
})
export class LoginHeaderComponent {
  constructor(private router: Router){

  }

  @Input() hideLogInButton: boolean | undefined;

  routeToLogIn(){
    this.router.navigate(['login'])
  }

  routeToHome(){
    this.router.navigate(['/'])
  }
}
