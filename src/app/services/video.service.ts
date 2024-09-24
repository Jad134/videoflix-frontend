import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }
  userId: any;
  favoriteVideos: any[] = [];
  
  getVideos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Token aus dem Session Storage
    });
    return this.http.get('https://jad-el-nader.developerakademie.org/videos/?time=' + new Date().getTime(), { headers })
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

