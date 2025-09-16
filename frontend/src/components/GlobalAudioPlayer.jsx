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
  selectRepeat,
  setRepeat,
  selectSuffle,
} from "../store/features/songSlice";
import { use } from "react";

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const seekTo = useSelector(selectSeekTo);
  const repeat = useSelector(selectRepeat);
  const suffle = useSelector(selectSuffle);
  const idx = useSelector(state => state.songs.currentIndex);


  useEffect(() => {
    localStorage.setItem('repeat', repeat);
  }, [repeat])

  useEffect(() => {
    localStorage.setItem('suffle', suffle);
  }, [suffle])

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

  useEffect(() => {
    localStorage.setItem("idx", idx);
  },[currentSong])

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
      const savedTime = localStorage.getItem("currentTime");
      if (savedTime) {
        audioRef.current.currentTime = Number(savedTime);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      localStorage.setItem("currentTime", audioRef.current.currentTime);
      dispatch(setProgress(audioRef.current.currentTime));
    }
  };

  

  return currentSong ? (
    <audio
      ref={audioRef}
      src={currentSong.audio}
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      onEnded={() => {
        repeat ? audioRef.current.play() :
        dispatch(nextSong())
      }}
      style={{ display: "none" }}
    />
  ) : null;
};

export default GlobalAudioPlayer;
