import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { Music } from '../../models/music/music.module';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="music-player" *ngIf="currentSong">
      <div class="song-info">
        <h3>{{ currentSong.file_name }}</h3>
      </div>
      <div class="player-controls">
        <audio #audioPlayer 
          [src]="getAudioUrl(currentSong.file_location)"
          controls
          autoplay
        ></audio>
      </div>
    </div>
  `,
  styles: [`
    .music-player {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      padding: 15px;
      z-index: 1000;
    }
    .song-info {
      margin-bottom: 10px;
    }
    .song-info h3 {
      margin: 0;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .player-controls audio {
      width: 100%;
    }
  `]
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  currentSong: Music | null = null;
  private subscription: Subscription | null = null;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.subscription = this.musicService.currentSong$.subscribe(song => {
      this.currentSong = song;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAudioUrl(fileLocation: string): string {
    return `${environment.apiUrl}/${fileLocation}`;
  }
}