import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";
import { FormsModule, NgModel } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';
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
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss','./responsive-register.component.scss'],
    imports: [LoginHeaderComponent, LoginFooterComponent, FormsModule, CommonModule],
    animations: [
        trigger('animSlider', [
            transition(':increment', right),
            transition(':decrement', left),
        ]),
    ],
})
export class RegisterComponent {
    sharedService = inject(SharedService);
    authService = inject(AuthenticationService);
    counter: number = 0;
    steps: Array<number> = [1, 2, 3, 4, 5];
    firstName!: string;
    lastName!: string;
    address!: string;
    phoneNumber!: string;
    pw1!: string;
    pw2!: string;
    loading = false;
    @ViewChild('mailInfo') mailInfo!: ElementRef<HTMLParagraphElement>;

    constructor(private router: Router) {

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


    checkMail(emailInput: NgModel) {
        if (emailInput.valid) {
            this.checkExistMail();
        } else {
            // Display a custom error message or take other actions
            this.mailInfo.nativeElement.innerText = '*Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            this.mailInfo.nativeElement.style.opacity = '1';
        }
    }


    /**
     * This function checks if the mail exist and control the infotext for existing mail
     */
    async checkExistMail() {
        await this.authService.checkUsername(this.sharedService.currentMail).then(mailExist => {
            if (mailExist) {
                this.mailInfo.nativeElement.style.opacity = '1'
                this.mailInfo.nativeElement.innerText = '*Diese Email ist bereits vergeben';
            } else {
                this.mailInfo.nativeElement.style.opacity = '0'
                this.onNext()
                console.log();

            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }


    /**
     * start the registrationfunction at authservice and add one to counter and control the loadingscreen
     */
    async register() {
        this.loading = true;
        if (this.pw1 === this.pw2) {
            let user = this.createUserObject()
            const isRegistered = await this.authService.registerUser(user);

            if (isRegistered) {
                this.counter++;
                this.loading = false;
            } else {
                this.loading = false;
            }
        } else {
            console.error('Passwörter stimmen nicht überein.');
            this.loading = false;
        }
    }


    /**
     * 
     * @returns userobject for the registration in backend
     */
    createUserObject() {
        let user = {
            address: this.address,
            password: this.pw1,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.sharedService.currentMail,
            username: this.sharedService.currentMail,
            phone: this.phoneNumber,
        };
        console.log(user);
        return user
 
        
    }


    routeToLogIn() {
        this.router.navigate(['login'])
    }
}



