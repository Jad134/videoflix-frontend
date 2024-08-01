import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }


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
        console.log('Login successful');
        // Redirect or do something else after successful login
      },
      error: (error) => {
        if (error.status === 403 && error.error.detail === 'User account is not activated.') {
          this.router.navigate(['/activate-info']);
        } else {
          // Handle other errors
          console.error('Login failed:', error);
        }
      }
    });
  }
}
