import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-activate-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activate-user-info.component.html',
  styleUrl: './activate-user-info.component.scss'
})
export class ActivateUserInfoComponent {
  constructor( private router: Router) { }

  sharedService = inject(SharedService);
  authService = inject(AuthenticationService);
  resendActivationLinkStatus!: boolean;
  loading = false;
  userNotFound!: boolean;
  userAlreadyActivated!: boolean;
  countdown: number = 10;  // Startzeit des Countdowns in Sekunden
  countdownInterval: any;

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

    this.authService.getNotFoundStatus().subscribe((status: boolean) => {
      this.userNotFound = status;
      if (status) {
        console.log('User not found test');
        this.loading = false;
        // Optional: Zeige Fehlermeldung für nicht gefundenen Benutzer an
      }
    });

    this.authService.getAlreadyActivatedStatus().subscribe((status: boolean) => {
      this.userAlreadyActivated = status;
      if (status) {
        console.log('User account is already activated test');
        this.loading = false;

        this.countdown = 10;  // Setze den Countdown auf 5 Sekunden
        this.countdownInterval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            
            clearInterval(this.countdownInterval);
            this.resetLinkStatus()
            this.router.navigate(['/browse']);  // Passe die Route entsprechend an
          }
        }, 1000);
        // Optional: Zeige Fehlermeldung für bereits aktivierten Benutzer an
      }
    });
  }

  
  resetLinkStatus(){
    this.resendActivationLinkStatus = false;
    this.userNotFound = false;
    this.userAlreadyActivated = false;
  }


  routeToRegisterPage(){
    this.router.navigate(['/register']);
  }
}
