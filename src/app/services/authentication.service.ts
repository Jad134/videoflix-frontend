import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { 
    const loggedIn = localStorage.getItem('userLoggedIn');
    this.userLoggedIn = loggedIn === 'true';

     // BUGFIX FÜR LOCAL STORAGE PROBLEM, wieterleitung dauert aber zu lange
    // if (typeof localStorage !== 'undefined') {
    //   const loggedIn = localStorage.getItem('userLoggedIn');
    //   this.userLoggedIn = loggedIn === 'true';
    // } else {
    //   // Fallback-Logik, falls 'localStorage' nicht verfügbar ist
    //   this.userLoggedIn = false;
    // }


  }
  resendActivationLinkStatus = new Subject<boolean>();
  private notFoundStatus = new Subject<boolean>();
  private alreadyActivatedStatus = new Subject<boolean>();
  userNameOrPasswordWrong = new Subject<boolean>();
  userLoggedIn : boolean = false;

  /**
   * 
   * @param username this function use mailaddress, but the backend needs username for login, thats why the username is the mailadress
   * @returns true or false if username/mail exist
   */
  async checkUsername(username: any) {
    return await fetch(`http://127.0.0.1:8000/check-username/${username}/`)
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

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", requestOptions);
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


  login(username: string, password: string): void {
    this.http.post('http://127.0.0.1:8000/login/', { username, password }).subscribe({
      next: (response: any) => {
        // Handle successful login
        this.userLoggedIn = true;
        localStorage.setItem('userLoggedIn', 'true');
        this.router.navigate(['/browse']);
        console.log('Login successful');
        // Redirect or do something else after successful login
      },
      error: (error) => {
        if (error.status === 403 && error.error.detail === 'User account is not activated.') {
          this.router.navigate(['/activate-info']);
        }
        else if (error.status === 400 && error.error.detail === 'Invalid credentials.'){
           console.log('name oder pw falsch')
           this.userNameOrPasswordWrong.next(true)
        }
        else {
          // Handle other errors
          console.error('Login failed:', error);
        }
      }
    });
  }


  resendActivationLink(username: string): void {
    this.http.post('http://127.0.0.1:8000/resend-activation/', { username }).subscribe({
      next: (response: any) => {
        console.log('Activation link resent successfully');
        this.resendActivationLinkStatus.next(true);
      },
      error: (error) => {
        if (error.status === 404 && error.error.detail === 'User not found.') {
          console.log('User nicht gefunden! Hier message für unbekannten user einfügen');
          this.notFoundStatus.next(true);
        }
        else if (error.status === 400 && error.error.detail === 'User account is already activated.') {
          console.log('User ist schon aktiviert. Hier message für bereits aktivierten user eingeben');
          this.alreadyActivatedStatus.next(true);
        }
        console.error('Failed to resend activation link:', error);
        this.resendActivationLinkStatus.next(false);
      }
    });
  }

  getResendActivationLinkStatus(): Observable<boolean> {
    return this.resendActivationLinkStatus.asObservable();
  }


  getNotFoundStatus(): Observable<boolean> {
    return this.notFoundStatus.asObservable();
  }


  getAlreadyActivatedStatus(): Observable<boolean> {
    return this.alreadyActivatedStatus.asObservable();
  }

  getLogInStatus() : Observable<boolean>{
    return this.userNameOrPasswordWrong.asObservable()
  }


  logout(): void {
    this.userLoggedIn = false;
    localStorage.setItem('userLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}

