import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LoginHeaderComponent } from "../../login-page/login-header/login-header.component";
import { LoginFooterComponent } from "../../login-page/login-footer/login-footer.component";
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';

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
    steps: Array<number> = [1, 2, 3, 4];
    firstName!: string;
    lastName!: string;
    address!: string;
    phoneNumber!: string;
    pw1!:string;
    pw2!:string;
    @ViewChild('mailInfo') mailInfo!: ElementRef<HTMLParagraphElement>;
 



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



    register() {
        let test = {
            'address': this.address,
            'number': this.phoneNumber,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'mail': this.sharedService.currentMail
        }
        console.log(test);

    }
}


