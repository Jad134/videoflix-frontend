import { Component } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [LoginHeaderComponent, LoginFooterComponent]
})
export class RegisterComponent {

}
