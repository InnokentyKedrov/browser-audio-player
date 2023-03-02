import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Player from './components/Player/Player';

function App() {
  const [track, setTrack] = useState();

  return (
    <>
      <Form setTrack={setTrack} />
      <Player track={track} />
    </>
  );
}

export default App;
