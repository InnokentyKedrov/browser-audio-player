import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Controls from '../Controls/Controls';
import Loader from '../Loader/Loader';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Player.module.css';

const Player = ({ track }: { track: string }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(60);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const audio = useRef<HTMLAudioElement>(null);
  const progress = useRef<HTMLInputElement>(null);

  const onLoadedMetadata = (): void => {
    const seconds = audio.current?.duration;
    if (seconds) {
      setDuration(seconds);
      if (progress.current) {
        progress.current.max = seconds.toString();
      }
    }
  };

  useEffect(() => {
    const myAudio = audio.current;
    if (myAudio) {
      const listener = (e: KeyboardEvent) => {
        e.preventDefault();

        //   ' Use Keyboard:  Space to Play/Pause | Enter to Stop | Arrows to Change Time and Volume'
        switch (e.code) {
          case 'Space':
            setIsPlaying(!isPlaying);
            break;
          case 'Enter':
            myAudio.load();
            setIsPlaying(false);
            break;
          case 'ArrowRight':
            myAudio.currentTime += 5;
            break;
          case 'ArrowLeft':
            myAudio.currentTime -= 5;
            break;
          case 'ArrowUp':
            if (volume < 100) setVolume(volume + 5);
            break;
          case 'ArrowDown':
            if (volume > 0) setVolume(volume - 5);
            break;
          default:
            return;
        }
      };
      document.addEventListener('keydown', listener);
      return function cleanup() {
        document.removeEventListener('keydown', listener);
      };
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    const myAudio = audio.current;

    if (myAudio) {
      myAudio.addEventListener('canplay', () => {
        setIsLoad(false);
      });

      myAudio.addEventListener('waiting', () => {
        setIsLoad(true);
      });

      myAudio.addEventListener('ended', () => {
        myAudio.load();
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <div className={style.player}>
      {isLoad && <Loader />}
      <Controls {...{ audio, progress, duration, setTimeProgress, isPlaying, setIsPlaying }} />
      <audio src={track} ref={audio} onLoadedMetadata={onLoadedMetadata} />
      <ProgressBar {...{ progress, audio, timeProgress, volume, setVolume }} />
    </div>
  );
};

export default Player;
