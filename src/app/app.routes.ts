import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { LoginDialogComponent } from './login-page/login-dialog/login-dialog.component';
import { RegisterComponent } from './register-page/register/register.component';
import { MainComponentComponent } from './main-page/main-component.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginDialogComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'browse', component: MainComponentComponent },

];
