import { useEffect, useRef, useState } from 'react';
import Controls from '../Controls/Controls';
import DisplayTrack from '../DisplayTrack/DisplayTrack';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Player.module.css';

const Player = ({ track }) => {
  const audioRef = useRef();

  // useEffect(() => {
  console.log(audioRef);
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);

  return (
    <div className={style.player}>
      <div className="inner">
        <Controls audioRef={audioRef} />
        <DisplayTrack track={track} audioRef={audioRef} />
        <ProgressBar />
      </div>
    </div>
  );
};

export default Player;
