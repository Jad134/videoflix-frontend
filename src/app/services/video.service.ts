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
  favoriteVideos: any[] = [];
  urlService = inject(ApiUrlsService)
  


  /**
   * Get the videos, if the user is Authorizated with token 
   * @returns http requests or the error messages
   */
  getVideos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Token aus dem Session Storage
    });
    return this.http.get(`${this.urlService.GET_VIDEO_URL}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Videos:', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']); 
        }
        // Rückgabe eines neuen Observables mit einem Fehler
        return throwError(() => new Error('Fehler beim Abrufen der Videos.')); 
      })
    );
}






  /**
   * 
   * @param videoId the id for the video to add the video to favorites in backend
   */
  toggleFavorite(videoId: number): Observable<any> {
    const userDatas = localStorage.getItem('userData');
    if (userDatas) {
      const userData = JSON.parse(userDatas);
      const userId = userData.user_id;
      return this.http.post(`https://videoflix.jad-portfolio-api.de/favorites/toggle/${videoId}/`, { user_id: userId });
    }
    return of(null); 
  }


  /**
   * 
   * @returns the numbers/id of liked videos
   */
  getFavoriteVideoIds(): Observable<number[]> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userDatas = localStorage.getItem('userData');
      if (userDatas) {
        const userData = JSON.parse(userDatas);
        const userId = userData.user_id; 
        return this.http.get<number[]>(`https://videoflix.jad-portfolio-api.de/favorites/user/${userId}/`);
      }
    }

    return of([]);
  }
}

