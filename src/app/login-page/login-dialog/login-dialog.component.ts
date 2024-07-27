import { Component } from '@angular/core';
import { LoginFooterComponent } from "../login-footer/login-footer.component";


@Component({
    selector: 'app-login-dialog',
    standalone: true,
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.scss',
    imports: [LoginFooterComponent]
})
export class LoginDialogComponent {

}
