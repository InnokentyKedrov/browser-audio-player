import { useEffect, useRef, useState } from 'react';
import Controls from '../Controls/Controls';
import Loader from '../Loader/Loader';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Player.module.css';

const Player = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(60);
  const [isLoad, setIsLoad] = useState(true);
  const audio = useRef();
  const progress = useRef();

  const onLoadedMetadata = () => {
    const seconds = audio.current.duration;
    setDuration(seconds);
    progress.current.max = seconds;
  };

  useEffect(() => {
    const myAudio = audio.current;

    myAudio.addEventListener('canplaythrough', () => {
      setIsLoad(false);
    });
  });

  const keyboardListener = () => {
    const myAudio = audio.current;
    //   ' Use Keyboard:  Space to Play/Pause | Enter to Stop | Arrows to Change Time and Volume'

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      switch (e.code) {
        case 'Space':
          setIsPlaying(!isPlaying);
          break;
        case 'Enter':
          myAudio.load();
          setIsPlaying(false);
          break;
        case 'ArrowRight':
          console.log('myAudio.currentTime first: ', myAudio.currentTime);
          myAudio.currentTime += 0.5;
          console.log('myAudio.currentTime second: ', myAudio.currentTime);
          break;
        case 'ArrowLeft':
          myAudio.currentTime -= 0.5;
          console.log('myAudio.currentTime: ', myAudio.currentTime);
          break;
        case 'ArrowUp':
          if (volume < 100) setVolume(volume + 5);
          break;
        case 'ArrowDown':
          if (volume > 0) setVolume(volume - 5);
          break;
        default:
          return;
          break;
      }
    });
  };

  return (
    <div className={style.player} onKeyDown={keyboardListener}>
      {isLoad && <Loader />}
      <Controls {...{ audio, progress, duration, setTimeProgress, isPlaying, setIsPlaying }} />
      <div>
        <audio src={track} ref={audio} onLoadedMetadata={onLoadedMetadata} />
      </div>
      <ProgressBar {...{ progress, audio, timeProgress, volume, setVolume }} />
    </div>
  );
};

export default Player;
