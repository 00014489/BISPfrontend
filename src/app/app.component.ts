import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <header>
        <h1>Music Platform</h1>
        <nav>
          <a routerLink="/music" routerLinkActive="active">Music Library</a>
          <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    nav a {
      margin-left: 15px;
      text-decoration: none;
      color: #333;
    }
    nav a.active {
      font-weight: bold;
      color: #007bff;
    }
  `]
})
export class AppComponent {
  title = 'music-platform';
}