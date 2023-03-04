import { useCallback, useEffect, useRef } from 'react';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';
import style from './Controls.module.css';

const Controls = ({ audio, progress, duration, setTimeProgress, isPlaying, setIsPlaying }) => {
  const playAnimation = useRef();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const repeat = useCallback(() => {
    if (audio.current) {
      const currentTime = audio.current.currentTime;
      setTimeProgress(currentTime);
      progress.current.value = currentTime;
      progress.current.style.setProperty(
        '--range-progress',
        `${(progress.current.value / duration) * 100}%`,
      );

      playAnimation.current = requestAnimationFrame(repeat);
    }
  }, [audio, duration, progress, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
    playAnimation.current = requestAnimationFrame(repeat);
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
