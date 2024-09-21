import { Component } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";

@Component({
    selector: 'app-data-protection',
    standalone: true,
    templateUrl: './data-protection.component.html',
    styleUrl: './data-protection.component.scss',
    imports: [LoginHeaderComponent, LoginFooterComponent]
})
export class DataProtectionComponent {
  hideLogInButton = true;

  goBack(){
    window.history.back()
  }
}
