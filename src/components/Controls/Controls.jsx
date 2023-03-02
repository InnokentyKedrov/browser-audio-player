import { useEffect, useState } from 'react';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';
import style from './Controls.module.css';

const Controls = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <div className={style.controls__wrapper}>
      <div className={style.controls}>
        {/* <button>
          <IoPlaySkipBackSharp />
        </button>
        <button>
          <IoPlayBackSharp />
        </button> */}

        <button className={style.controls__button} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        {/* <button>
          <IoPlayForwardSharp />
        </button>
        <button>
          <IoPlaySkipForwardSharp />
        </button> */}
      </div>
    </div>
  );
};

export default Controls;
