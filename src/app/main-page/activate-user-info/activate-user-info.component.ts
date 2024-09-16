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
  constructor(private router: Router) { }

  sharedService = inject(SharedService);
  authService = inject(AuthenticationService);
  resendActivationLinkStatus!: boolean;
  loading = false;
  userNotFound!: boolean;
  userAlreadyActivated!: boolean;
  countdown: number = 10;  // Startzeit des Countdowns in Sekunden
  countdownInterval: any;


  /**
   * This function resend the activate link (post request to django backend) for activate the account
   */
  getActivateLink(): void {
    this.loading = true;
    const username = this.sharedService.currentMail; //  sharedService.currentMail is username at backend
    this.authService.resendActivationLink(username);

    this.getResendActivationLinkStatus()

    this.getUserNotFoundStatus()
    
    this.getAlreadyActivatedStatus()
  }


  /**
   * checks, if the user can get a new activation link
   */
  getResendActivationLinkStatus() {
    this.authService.getResendActivationLinkStatus().subscribe((status: boolean) => {
      this.resendActivationLinkStatus = status;
      if (status) {
        console.log('Link sent successfully');
        this.loading = false;
      } else {
        console.log('Failed to send link');
        this.loading = false;
      }
    });
  }


  /**
   * Controls, if the user not found
   */
  getUserNotFoundStatus(){
    this.authService.getNotFoundStatus().subscribe((status: boolean) => {
      this.userNotFound = status;
      if (status) {
        console.log('User not found ');
        this.loading = false;
      }
    });
  }


  /**
   * Checks, if the user is already activated
   */
  getAlreadyActivatedStatus(){
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
      }
    });
  }


  /**
   * reset the status
   */
  resetLinkStatus() {
    this.resendActivationLinkStatus = false;
    this.userNotFound = false;
    this.userAlreadyActivated = false;
  }


  /**
   * Route to the register page 
   */
  routeToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
