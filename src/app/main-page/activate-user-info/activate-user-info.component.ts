import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-activate-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activate-user-info.component.html',
  styleUrl: './activate-user-info.component.scss'
})
export class ActivateUserInfoComponent {
  sharedService = inject(SharedService);
  authService = inject(AuthenticationService);
  resendActivationLinkStatus!: boolean;
  loading = false;

  getActivateLink(): void {
    this.loading = true;
    const username = this.sharedService.currentMail; // Annahme: sharedService.currentMail enthält den Benutzernamen
    this.authService.resendActivationLink(username);

    this.authService.getResendActivationLinkStatus().subscribe((status: boolean) => {
      this.resendActivationLinkStatus = status;
      if (status) {
        console.log('Link sent successfully');
        this.loading = false;
        // Optional: Zeige Erfolgsmeldung an
      } else {
        console.log('Failed to send link');
        this.loading = false;
        // Optional: Zeige Fehlermeldung an
      }
    });
  }


  resetActivationLinkStatus(){
    this.resendActivationLinkStatus = false;
  }
}
