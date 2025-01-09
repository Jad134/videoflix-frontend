import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient, private router: Router) { }
  userId: any;
  favoriteVideos: any[] = [];


  /**
   * Get the videos, if the user is Authorizated with token 
   * @returns http requests or the error messages
   */
  getVideos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Token aus dem Session Storage
    });
    return this.http.get('https://jad-el-nader.developerakademie.org/videos/?time=' + new Date().getTime(), { headers })
    .pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Videos:', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']); 
        }
        // Rückgabe eines neuen Observables mit einem Fehler
        return throwError(() => new Error('Fehler beim Abrufen der Videos.')); // Aktualisierte Nutzung
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
      return this.http.post(`https://jad-el-nader.developerakademie.org/favorites/toggle/${videoId}/`, { user_id: userId });
    }
    return of(null); // Gibt ein leeres Observable zurück, falls kein userData vorhanden ist
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
        const userId = userData.user_id; // Zugriff auf die user_id Eigenschaft
        return this.http.get<number[]>(`https://jad-el-nader.developerakademie.org/favorites/user/${userId}/`);
      }
    }
    // Wenn localStorage nicht verfügbar oder kein userData vorhanden, geben wir ein leeres Array zurück
    return of([]);
  }
}

