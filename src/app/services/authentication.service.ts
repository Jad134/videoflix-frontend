import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { 
    if (typeof localStorage !== 'undefined') {

    } else {

    }
  }
  resendActivationLinkStatus = new Subject<boolean>();
  private notFoundStatus = new Subject<boolean>();
  private alreadyActivatedStatus = new Subject<boolean>();
  userNameOrPasswordWrong = new Subject<boolean>();
  userLoggedIn : boolean = true;

  
  /**
   * 
   * @param username this function use mailaddress, but the backend needs username for login, thats why the username is the mailadress
   * @returns true or false if username/mail exist
   */
  async checkUsername(username: any) {
    return await fetch(`https://jad-el-nader.developerakademie.org/check-username/${username}/`)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          return true
        } else {
          return false
        }
      })
      .catch(error => {
        console.error('Error:', error);
        return false; // Optional: Behandle den Fehler und gib false zurück
      });
  }


  /**
   * 
   * @param user userobject from register component
   * @returns true or false to control the counter at register component for the last slide animation
   */
  async registerUser(user: any): Promise<boolean> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(user);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return await this.tryRegisterUser(requestOptions);
  }


  /**
   * try to register a user
   * @returns the status, if the register was successfull
   */
  async tryRegisterUser(requestOptions: RequestInit){
    try {
      const response = await fetch("https://jad-el-nader.developerakademie.org/register/", requestOptions);
      if (response.ok) {
        return true; // Registrierung erfolgreich
      } else {
        const errorText = await response.text();
        console.error(errorText);
        return false; // Registrierung fehlgeschlagen
      }
    } catch (error) {
      console.error(error);
      return false; // Fehler beim Netzwerk
    }
  }


  /**
   * login function-
   */
  login(username: string, password: string): void {
    this.http.post('https://jad-el-nader.developerakademie.org/api/token/', { username, password }).subscribe({
        next: (response: any) => {
            this.handleSuccessLogin(response);
        },
        error: (error) => {
            if (error.status === 403 && error.error.detail === 'User account is not activated.') {
                this.router.navigate(['/activate-info']);
            } else if (error.status === 400 || error.status === 401 ) {
                this.userNameOrPasswordWrong.next(true);
            } else {
                console.error('Login failed:', error);
            }
        }
    });
}


  /**
   * Handle the successfully login and set token to local storage
   */
  handleSuccessLogin(response: any) {
    this.userLoggedIn = true;
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    this.router.navigate(['/browse']);
  }


  /**
   * 
   * @param username 
   */
  resendActivationLink(username: string): void {
    this.http.post('https://jad-el-nader.developerakademie.org/resend-activation/', { username }).subscribe({
      next: (response: any) => {
        this.resendActivationLinkStatus.next(true);
      },
      error: (error) => {
        this.handleResendActivationLinkErrors(error)
      }
    });
  }


  /**
   * Handle the errors to display, which case is wrong 
   */
handleResendActivationLinkErrors(error:any){
  if (error.status === 404 && error.error.detail === 'User not found.') {
    this.notFoundStatus.next(true);
  }
  else if (error.status === 400 && error.error.detail === 'User account is already activated.') {
    this.alreadyActivatedStatus.next(true);
  }
  console.error('Failed to resend activation link:', error);
  this.resendActivationLinkStatus.next(false);
}


  /**
   * 
   * @returns the status if the activate link is send
   */
  getResendActivationLinkStatus(): Observable<boolean> {
    return this.resendActivationLinkStatus.asObservable();
  }


  /**
   * 
   * @returns the status, if the user is already registered
   */
  getNotFoundStatus(): Observable<boolean> {
    return this.notFoundStatus.asObservable();
  }


  /**
   * 
   * @returns the status, if the user is activated
   */
  getAlreadyActivatedStatus(): Observable<boolean> {
    return this.alreadyActivatedStatus.asObservable();
  }

  /**
   * 
   * @returns if the password or username is wrong
   */
  getLogInStatus() : Observable<boolean>{
    return this.userNameOrPasswordWrong.asObservable()
  }


  /**
   * log the user out and update local storage
   */
  logout(): void {
    this.userLoggedIn = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);

  }


  requestPasswordReset(mail: any) {
    this.http.post('https://jad-el-nader.developerakademie.org/password-reset/', { email: mail })
      .subscribe({
        next: (response) => {

        },
        error: (error) => {

        }
      });
  }
}

