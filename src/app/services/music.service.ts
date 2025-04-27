import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Music, Playlist } from '../models/music/music.module';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = environment.apiUrl;
  private currentSongSubject = new BehaviorSubject<Music | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserMusic(userId: string): Observable<Music[]> {
    return this.http.get<Music[]>(`${this.apiUrl}/api/Music/${userId}`);
  }

  getPlaylists(userId: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/api/Playlists/${userId}`);
  }

  playSong(song: Music): void {
    this.currentSongSubject.next(song);
  }

  stopSong(): void {
    this.currentSongSubject.next(null);
  }
}