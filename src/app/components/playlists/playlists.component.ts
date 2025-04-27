import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { Playlist, Music } from '../../models/music/music.module';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="playlists-container">
      <h2>My Playlists</h2>
      
      @if (playlists.length > 0) {
        <div class="playlists-grid">
          @for (playlist of playlists; track playlist.id) {
            <div class="playlist-card" (click)="selectedPlaylist = playlist">
              <h3>{{ playlist.name }}</h3>
              <p>{{ playlist.songs.length }} songs</p>
            </div>
          }
        </div>
        
        @if (selectedPlaylist) {
          <div class="playlist-details">
            <h3>{{ selectedPlaylist.name }}</h3>
            <div class="song-list">
              @for (song of selectedPlaylist.songs; track song.id; let i = $index) {
                <div class="song-item" (click)="playSong(song)">
                  <span class="song-number">{{ i + 1 }}</span>
                  <span class="song-name">{{ song.file_name }}</span>
                </div>
              } @empty {
                <p>No songs in this playlist</p>
              }
            </div>
          </div>
        }
      } @else {
        <div class="no-playlists">
          <p>You don't have any playlists yet.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .playlists-container {
      padding: 20px;
    }
    .playlists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .playlist-card {
      padding: 15px;
      border-radius: 8px;
      background-color: #f5f5f5;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .playlist-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .playlist-card h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
    }
    .playlist-card p {
      margin: 0;
      color: #666;
    }
    .playlist-details {
      margin-top: 20px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .song-list {
      margin-top: 15px;
    }
    .song-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }
    .song-item:hover {
      background-color: #f0f0f0;
    }
    .song-number {
      width: 30px;
      color: #777;
    }
    .song-name {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .no-playlists {
      text-align: center;
      padding: 50px 0;
      color: #666;
    }
  `]
})
export class PlaylistsComponent implements OnInit {
  userId: string = '';
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist | null = null;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    // In a real app, you would get the userId from Telegram Mini App
    this.userId = this.getTelegramUserId();
    this.loadPlaylists();
  }

  getTelegramUserId(): string {
    if (window.Telegram && window.Telegram.WebApp) {
      return window.Telegram.WebApp.initDataUnsafe?.user?.id.toString() || '';
    }
    return '';
  }

  loadPlaylists(): void {
    this.musicService.getPlaylists(this.userId).subscribe({
      next: (data) => {
        this.playlists = data;
      },
      error: (error) => {
        console.error('Error loading playlists:', error);
      }
    });
  }

  playSong(song: Music): void {
    this.musicService.playSong(song);
  }
}