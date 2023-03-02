import style from './DisplayTrack.module.css';

const DisplayTrack = ({ track, audioRef }) => {
  return (
    <div>
      <audio src={track} audioRef={audioRef} />
    </div>
  );
};

export default DisplayTrack;
