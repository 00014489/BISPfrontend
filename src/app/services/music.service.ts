import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap } from 'rxjs';
import { Music, Playlist } from '../models/music/music.module';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = environment.apiUrl;
  private currentSongSubject = new BehaviorSubject<Music | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('MusicService initialized with API URL:', this.apiUrl);
  }

  getUserMusic(userId: string): Observable<Music[]> {
    // Fix double /api issue - determine the correct endpoint
    const endpoint = this.apiUrl.includes('/api') 
      ? `${this.apiUrl}/Music/${userId}`  // If apiUrl already has /api
      : `${this.apiUrl}/api/Music/${userId}`; // If apiUrl doesn't have /api
    
    console.log('Fetching user music for userId:', userId);
    console.log('Request URL:', endpoint);
    
    return this.http.get<Music[]>(endpoint).pipe(
      tap(response => console.log('Music API response:', response)),
      catchError(error => {
        console.error('Error fetching music:', error);
        throw error;
      })
    );
  }

  getPlaylists(userId: string): Observable<Playlist[]> {
    const endpoint = this.apiUrl.includes('/api') 
      ? `${this.apiUrl}/Playlists/${userId}`  
      : `${this.apiUrl}/api/Playlists/${userId}`; 
    
    console.log('Fetching playlists for userId:', userId);
    console.log('Request URL:', endpoint);
    
    return this.http.get<Playlist[]>(endpoint).pipe(
      tap(response => console.log('Playlists API response:', response)),
      catchError(error => {
        console.error('Error fetching playlists:', error);
        throw error;
      })
    );
  }

  playSong(song: Music): void {
    console.log('Playing song:', song);
    this.currentSongSubject.next(song);
  }

  stopSong(): void {
    console.log('Stopping song playback');
    this.currentSongSubject.next(null);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { Music, Playlist } from '../models/music/music.module';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class MusicService {
//   private apiUrl = environment.apiUrl;
//   private currentSongSubject = new BehaviorSubject<Music | null>(null);
//   currentSong$ = this.currentSongSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   getUserMusic(userId: string): Observable<Music[]> {
//     console.log('Fetching user music for userId:', userId);
//     return this.http.get<Music[]>(`${this.apiUrl}/api/Music/${userId}`);
//   }

//   getPlaylists(userId: string): Observable<Playlist[]> {
//     return this.http.get<Playlist[]>(`${this.apiUrl}/api/Playlists/${userId}`);
//   }

//   playSong(song: Music): void {
//     this.currentSongSubject.next(song);
//   }

//   stopSong(): void {
//     this.currentSongSubject.next(null);
//   }
// }