import { createSlice } from '@reduxjs/toolkit';
// Sample initial music data

const initialState = {
  songs: [],
  currentIndex: Number(localStorage.getItem("idx")) || 0,
  isPlaying: false,
  progress : Number(localStorage.getItem("currentTime")) || 0,
  duration : 0,
  repeat : localStorage.getItem('repeat') === "true",
  seekTo : null,
  suffle : localStorage.getItem('suffle') === "true",
  filteredSongs: [], // For search functionality
  show : false
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setRepeat : (state, action) => {
      state.repeat = action.payload;
    },
    toggleSuffle : (state) => {
      state.suffle = !state.suffle;
    },
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
      if (state.songs.length === 0) return;

      if (state.suffle) {
        // 🔹 pick a random index different from currentIndex
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * state.songs.length);
        } while (randomIndex === state.currentIndex && state.songs.length > 1);
        state.currentIndex = randomIndex;
      } else {
        // 🔹 normal next
        state.currentIndex =
          (state.currentIndex + 1) % state.songs.length;
      }
      state.progress = 0; // reset progress
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
  ,setCurrentIndex, setRepeat, toggleShow, toggleSuffle, setDuration, seekSong, clearSeek,
   setProgress, nextSong, prevSong, setFilteredSongs } = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectCurrentSong = (state) => state.songs.songs[state.songs.currentIndex];
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectFilteredSongs = (state) => state.songs.filteredSongs;
export const selectProgress = (state) => state.songs.progress;
export const selectDuration = (state) => state.songs.duration;
export const selectSeekTo = (state) => state.songs.seekTo;
export const selectRepeat = (state) => state.songs.repeat;
export const selectSuffle = (state) => state.songs.suffle;

export default songSlice.reducer;
