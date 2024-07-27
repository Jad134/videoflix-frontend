import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  checkUsername(username:any) {
    fetch(`http://127.0.0.1:8000/check-username/${username}/`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                console.log(data.message);
                // Benutzername ist bereits vergeben
            } else {
                console.log(data.message);
                // Benutzername ist verfügbar
            }
        })
        .catch(error => console.error('Error:', error));
}
}
