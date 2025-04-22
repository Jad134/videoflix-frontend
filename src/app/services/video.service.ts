import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient, private router: Router) { }
  userId: any;
  urlService = inject(ApiUrlsService)



  /**
   * Get the videos, if the user is Authorizated with token 
   * @returns http requests or the error messages
   */
  getVideos(): Observable<any> {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token')!;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.getVideosWithErrorHandling(headers)
  }


  getVideosWithErrorHandling(headers: HttpHeaders) {
    return this.http.get(`${this.urlService.GET_VIDEO_URL}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Fehler beim Abrufen der Videos:', error);
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Fehler beim Abrufen der Videos.'));
        })
      );
  }

}

