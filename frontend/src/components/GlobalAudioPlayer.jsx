import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentSong,
  selectIsPlaying,
  togglePlayPause,
} from '../store/features/songSlice';

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleEnded = () => {
    dispatch(togglePlayPause()); // stop play icon when audio ends
  };

  if (!currentSong) return null;

  return (
    <audio
      ref={audioRef}
      src={currentSong.audio}
      autoPlay
      onEnded={handleEnded}
      style={{ display: 'none' }}
    />
  );
};

export default GlobalAudioPlayer;
