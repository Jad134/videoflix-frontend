import { Component, inject } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [LoginHeaderComponent, LoginFooterComponent, FormsModule]
})
export class RegisterComponent {
    sharedService = inject(SharedService);



}
