import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { LoginDialogComponent } from './login-page/login-dialog/login-dialog.component';
import { RegisterComponent } from './register-page/register/register.component';
import { MainComponentComponent } from './main-page/main-component.component';
import { ActivateUserInfoComponent } from './main-page/activate-user-info/activate-user-info.component';
import { FavoritesComponent } from './main-page/favorites/favorites.component';
import { DataProtectionComponent } from './legals/data-protection/data-protection.component';
import { ImpressumComponent } from './legals/impressum/impressum.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginDialogComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'browse', component: MainComponentComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'activate-info', component: ActivateUserInfoComponent },
    { path: 'data-protection', component: DataProtectionComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'reset-password', component: ResetPasswordComponent },


];
