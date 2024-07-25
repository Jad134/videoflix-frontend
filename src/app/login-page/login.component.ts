import { Component } from '@angular/core';
import { LoginHeaderComponent } from "./login-header/login-header.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [LoginHeaderComponent]
})
export class LoginComponent {

}
