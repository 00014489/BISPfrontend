import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../services/music.service';
import { Music } from '../../models/music/music.module';
import { MusicPlayerComponent } from '../music-player/music-player.component';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MusicPlayerComponent],
  template: `
    <div class="music-list-container">
      <h2>My Music</h2>
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search music..." 
          [(ngModel)]="searchQuery"
          (input)="filterMusic()"
        >
      </div>

      <div class="music-grid">
        @for (song of filteredSongs; track song.id) {
          <div class="music-card" (click)="playSong(song)">
            <div class="music-icon">
              <i class="fa fa-music"></i>
            </div>
            <div class="music-details">
              <h3>{{ song.file_name }}</h3>
            </div>
          </div>
        } @empty {
          <div class="no-music">
            <p>No music found. Try a different search.</p>
          </div>
        }
      </div>

      <app-music-player></app-music-player>
    </div>
  `,
  styles: [`
    .music-list-container {
      padding: 20px;
    }
    .search-bar {
      margin-bottom: 20px;
    }
    .search-bar input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .music-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .music-card {
      padding: 15px;
      border-radius: 8px;
      background-color: #f5f5f5;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .music-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .music-icon {
      font-size: 24px;
      color: #007bff;
      margin-bottom: 10px;
    }
    .music-details h3 {
      margin: 0;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .no-music {
      grid-column: 1 / -1;
      text-align: center;
      padding: 30px;
      color: #666;
    }
  `]
})
export class MusicListComponent implements OnInit {
  userId: string = '';
  songs: Music[] = [];
  filteredSongs: Music[] = [];
  searchQuery: string = '';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    // In a real app, you would get the userId from Telegram Mini App
    this.userId = this.getTelegramUserId();
    this.loadMusic();
  }

  getTelegramUserId(): string {
    // Use the Telegram WebApp object to get user info
    if (window.Telegram && window.Telegram.WebApp) {
      return window.Telegram.WebApp.initDataUnsafe?.user?.id.toString() || '';
    }
    return '';
  }

  loadMusic(): void {
    this.musicService.getUserMusic(this.userId).subscribe({
      next: (data) => {
        this.songs = data;
        this.filteredSongs = data;
      },
      error: (error) => {
        console.error('Error loading music:', error);
      }
    });
  }

  filterMusic(): void {
    if (!this.searchQuery.trim()) {
      this.filteredSongs = this.songs;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredSongs = this.songs.filter(song => 
        song.file_name.toLowerCase().includes(query)
      );
    }
  }

  playSong(song: Music): void {
    this.musicService.playSong(song);
  }
}