import { useEffect, useState } from 'react';
import style from './ProgressBar.module.css';

const ProgressBar = ({ progress, audio, timeProgress }) => {
  const [volume, setVolume] = useState(60);

  const handleProgressChange = () => {
    audio.current.currentTime = progress.current.value;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  useEffect(() => {
    if (audio) {
      audio.current.volume = volume / 100;
    }
  }, [volume, audio]);

  return (
    <>
      <div className={style.progress}>
        <input
          className={style.progress__range}
          type="range"
          defaultValue="0"
          onChange={handleProgressChange}
          ref={progress}
        />
      </div>
      <div className={style.timeAndValume__wrapper}>
        <span className={style.progress__time}>{formatTime(timeProgress)}</span>
        <input
          className={style.volume}
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #000 ${volume}%, #fff ${volume}%)`,
          }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
