import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LoginFooterComponent } from "../login-footer/login-footer.component";
import { LoginHeaderComponent } from "../login-header/login-header.component";
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { Router } from '@angular/router';

const left = [
  query(':enter, :leave', style({ position: 'absolute', }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(300%)' }))], {
          optional: true,
      }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'absolute', }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-300%)' }))], {
          optional: true,
      }),
  ]),
];



@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  imports: [LoginFooterComponent, LoginHeaderComponent, CommonModule, FormsModule],
  animations: [
    trigger('animSlider', [
        transition(':increment', right),
        transition(':decrement', left),
    ]),
],
})
export class ResetPasswordComponent {
  hideLogInButton = true;
  sharedService = inject(SharedService);
  authService = inject(AuthenticationService);
  @ViewChild('mailInfo') mailInfo!: ElementRef<HTMLParagraphElement>;
  counter: number = 0;
  steps: Array<number> = [1, 2];

  constructor(private router: Router) {

  }


  /**
     * This function checks if the mail exist and control the infotext for existing mail
     */
  async checkExistMail() {
    await this.authService.checkUsername(this.sharedService.currentMail).then(mailExist => {
        if (mailExist) {
           this.mailInfo.nativeElement.style.opacity = '0'
           this.authService.requestPasswordReset(this.sharedService.currentMail)
           this.onNext()
        } else {
             this.mailInfo.nativeElement.style.opacity = '1'
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}


/**
     * This function add one to counter for the slide div animation
     */
onNext() {
  if (this.counter < this.steps.length - 1) {
      this.counter++;
  }
}


/**
* This function deducts one from counter for the slide div animation
*/
onPrevious() {
  if (this.counter > 0) {
      this.counter--;
  }
}

routeToLogIn() {
  this.router.navigate(['login'])
}


}
