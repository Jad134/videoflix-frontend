import { Component } from '@angular/core';
import { LoginHeaderComponent } from "./login-header/login-header.component";
import { LoginMainComponent } from "./login-main/login-main/login-main.component";
import { LoginFooterComponent } from "./login-footer/login-footer.component";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [LoginHeaderComponent, LoginMainComponent, LoginFooterComponent, LoginDialogComponent]
})
export class LoginComponent {

}
