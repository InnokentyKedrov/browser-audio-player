import React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';
import style from './Controls.module.css';

type PropsType = {
  audio: React.RefObject<HTMLAudioElement>;
  progress: React.RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: (args: number) => void;
  isPlaying: boolean;
  setIsPlaying: (args: boolean) => void;
};

const Controls = ({
  audio,
  progress,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
}: PropsType) => {
  const playAnimation = useRef();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const repeat = useCallback(() => {
    if (audio.current) {
      const currentTime = audio.current?.currentTime;
      setTimeProgress(currentTime);
      if (progress.current) {
        progress.current.value = (currentTime as number).toString();
        progress.current.style.setProperty(
          '--range-progress',
          `${(Number(progress.current.value) / Number(duration)) * 100}%`,
        );
      }

      (playAnimation.current as unknown as number) = requestAnimationFrame(repeat);
    }
  }, [audio, duration, progress, setTimeProgress]);

  useEffect(() => {
    if (audio.current) {
      if (isPlaying) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }

    (playAnimation.current as unknown as number) = requestAnimationFrame(repeat);
  }, [isPlaying, audio, repeat]);

  return (
    <div className={style.controls__wrapper}>
      <div className={style.controls}>
        <button className={style.controls__button} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
