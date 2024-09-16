import { Component } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";

@Component({
    selector: 'app-impressum',
    standalone: true,
    templateUrl: './impressum.component.html',
    styleUrl: './impressum.component.scss',
    imports: [LoginHeaderComponent, LoginFooterComponent]
})
export class ImpressumComponent {
  hideLogInButton: boolean = true;

}
