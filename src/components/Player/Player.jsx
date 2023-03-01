import { useEffect, useRef, useState } from 'react';
import style from './Player.module.css';

const Player = () => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef(null);

  // useEffect(() => {
  //   console.log(audioRef)
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);

  return (
      <div className={style.player}>
        <audio controls>
          <source src="./128.mp3" />
        </audio>
      </div>
  )
}

export default Player;