import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  async checkUsername(username: any) {
    return await fetch(`http://127.0.0.1:8000/check-username/${username}/`)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          console.log(data.message);
          return true
        } else {
          console.log(data.message);
          return false
        }
      })
      .catch(error => {
        console.error('Error:', error);
        return false; // Optional: Behandle den Fehler und gib false zurück
      });
  }

  async registerUser(user: any) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions : RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
