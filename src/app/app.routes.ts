import { Routes } from '@angular/router';
import { MusicListComponent } from './components/music-list/music-list.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

export const routes: Routes = [
  { path: '', redirectTo: '/music', pathMatch: 'full' },
  { path: 'music', component: MusicListComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: '**', redirectTo: '/music' }
];