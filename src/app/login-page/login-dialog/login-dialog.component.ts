import { Component, inject, Input } from '@angular/core';
import { LoginFooterComponent } from "../login-footer/login-footer.component";
import { LoginHeaderComponent } from "../login-header/login-header.component";
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-login-dialog',
    standalone: true,
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.scss',
    imports: [LoginFooterComponent, LoginHeaderComponent, FormsModule]
})
export class LoginDialogComponent {
    sharedService = inject(SharedService);

    hideLogInButton = true;
}
