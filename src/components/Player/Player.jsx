import { useEffect, useRef, useState } from 'react';
import Controls from '../Controls/Controls';
import DisplayTrack from '../DisplayTrack/DisplayTrack';
import Loader from '../Loader/Loader';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Player.module.css';

const Player = ({ track }) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const audio = useRef();
  const progress = useRef();

  useEffect(() => {
    const myAudio = audio.current;
    myAudio.addEventListener('progress', () => {
      console.log('progress: ', 'progress');
      setIsLoad(true);
    });
    myAudio.addEventListener('canplay', () => {
      console.log('canplay: ', 'canplay');
      setIsLoad(false);
    });
  }, []);

  return (
    <div className={style.player}>
      {isLoad && <Loader />}
      <Controls {...{ audio, progress, duration, setTimeProgress }} />
      <DisplayTrack {...{ track, audio, setDuration, progress, setIsLoad }} />
      <ProgressBar {...{ progress, audio, timeProgress }} />
    </div>
  );
};

export default Player;
