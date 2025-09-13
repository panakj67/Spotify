import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextSong,
  selectCurrentSong,
  selectIsPlaying,
  setProgress,
  setDuration,
  selectSeekTo,
  clearSeek,
} from "../store/features/songSlice";

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const seekTo = useSelector(selectSeekTo);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error(err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (seekTo !== null && audioRef.current) {
      audioRef.current.currentTime = seekTo;
      dispatch(clearSeek());
    }
  }, [seekTo, dispatch]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setProgress(audioRef.current.currentTime));
    }
  };

  return currentSong ? (
    <audio
      ref={audioRef}
      src={currentSong.audio}
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      onEnded={() => dispatch(nextSong())}
      style={{ display: "none" }}
    />
  ) : null;
};

export default GlobalAudioPlayer;
