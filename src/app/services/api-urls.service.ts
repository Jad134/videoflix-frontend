import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor() { }

  BASE_URL = 'http://127.0.0.1:8000';
  CHECK_USERNAME_URL = `${this.BASE_URL}/check-username/`
  REGISTER_USER_URL  =  `${this.BASE_URL}/register/`
  LOGIN_URL =   `${this.BASE_URL}/login/`
  RESEND_EMAIL_ACTIVATION_LINK = `${this.BASE_URL}/resend-activation/`
  RESET_PASSWORD_URL = `${this.BASE_URL}/password-reset/`
  GET_VIDEO_URL = `${this.BASE_URL}/videos/`

}
