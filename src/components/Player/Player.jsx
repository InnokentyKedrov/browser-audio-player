import { useEffect, useRef, useState } from 'react';
import Controls from '../Controls/Controls';
import DisplayTrack from '../DisplayTrack/DisplayTrack';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Player.module.css';

const Player = ({ track }) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef();
  const progress = useRef();

  return (
    <div className={style.player}>
      <Controls {...{ audio, progress, duration, setTimeProgress }} />
      <DisplayTrack {...{ track, audio, setDuration, progress }} />
      <ProgressBar {...{ progress, audio, timeProgress }} />
    </div>
  );
};

export default Player;
