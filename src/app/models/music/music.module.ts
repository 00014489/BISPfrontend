export interface Music {
  id: number;
  file_name: string;
  file_location: string;
  file_id: string;
  all_musics: boolean;
  // For dynamic playlist properties
  [key: string]: any;
}

export interface Playlist {
  id: number;
  name: string;
  songs: Music[];
}