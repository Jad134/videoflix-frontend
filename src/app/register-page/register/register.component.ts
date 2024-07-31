import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";
import { FormsModule } from '@angular/forms';
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
    styleUrl: './register.component.scss',
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

    constructor(private router: Router){

    }



    onNext() {
        if (this.counter < this.steps.length - 1) {
            this.counter++;
        }
    }

    onPrevious() {
        if (this.counter > 0) {
            this.counter--;
        }
    }


    async checkExistMail() {
        await this.authService.checkUsername(this.sharedService.currentMail).then(mailExist => {
            if (mailExist) {
                this.mailInfo.nativeElement.style.opacity = '1'
            } else {
                this.mailInfo.nativeElement.style.opacity = '0'
                this.onNext()
                console.log();

            }
        }).catch(error => {
            console.error('Error:', error);
            // Optional: Behandle den Fehler hier
        });
    }



    async register() {
        this.loading = true;
        if (this.pw1 === this.pw2) {
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

            const isRegistered = await this.authService.registerUser(user);

            if (isRegistered) {
                console.log('Registrierung erfolgreich du tester.');
               this.counter++;
               this.loading = false;
                // Beispiel: this.router.navigate(['/welcome']);
            } else {
                console.error('Registrierung fehlgeschlagen.');
                this.loading = false;
            }
        } else {
            console.error('Passwörter stimmen nicht überein.');
            this.loading = false;
        }
    }

    routeToLogIn(){
        this.router.navigate(['login'])
      }
}



