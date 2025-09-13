import { createSlice } from '@reduxjs/toolkit';
// Sample initial music data
const initialState = {
  songs: [],
  currentIndex: 0,
  isPlaying: false,
  progress : 0,
  duration : 0,
  seekTo : null,
  filteredSongs: [], // For search functionality
  show : false
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    toggleShow : (state) => {
      state.show = !state.show
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    searchSongs: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.trim() === '') {
        state.filteredSongs = [];
      } else {
        state.filteredSongs = state.songs.filter(
          song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
      }
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    setSongs : (state, action) => {
      state.songs = action.payload;
    },
    nextSong : (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.songs.length;
    },
    prevSong : (state) => {
      state.currentIndex = (state.currentIndex - 1 + state.songs.length) % state.songs.length;
    },
    setCurrentIndex : (state, action) =>{
      state.currentIndex = action.payload;
    },
    setProgress : (state, action) => {
      state.progress = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    seekSong: (state, action) => {
      state.seekTo = action.payload;
    },
    clearSeek: (state) => {
      state.seekTo = null;
    },
    setFilteredSongs: (state, action) => {
      state.filteredSongs = action.payload;
    }
  },
});

export const { setCurrentSong, togglePlayPause, searchSongs, addSong, setSongs
  ,setCurrentIndex, toggleShow, setDuration, seekSong, clearSeek,
   setProgress, nextSong, prevSong, setFilteredSongs } = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectCurrentSong = (state) => state.songs.songs[state.songs.currentIndex];
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectFilteredSongs = (state) => state.songs.filteredSongs;
export const selectProgress = (state) => state.songs.progress;
export const selectDuration = (state) => state.songs.duration;
export const selectSeekTo = (state) => state.songs.seekTo;

export default songSlice.reducer;
