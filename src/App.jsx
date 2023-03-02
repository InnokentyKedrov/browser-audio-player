import { useEffect, useState } from 'react';
import style from './App.module.css';
import Form from './components/Form/Form';
import Player from './components/Player/Player';

function App() {
  const [track, setTrack] = useState();

  const back = () => {
    setTrack();
  };

  return (
    <>
      {!track ? (
        <Form setTrack={setTrack} />
      ) : (
        <div className={style.player__wrapper}>
          <button className={style.back} onClick={back}>
            ← Back
          </button>
          <Player track={track} />
        </div>
      )}
    </>
  );
}

export default App;
