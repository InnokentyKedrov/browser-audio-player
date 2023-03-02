const DisplayTrack = ({ track, audio, setDuration, progress }) => {
  const onLoadedMetadata = () => {
    const seconds = audio.current.duration;
    setDuration(seconds);
    progress.current.max = seconds;
  };

  return (
    <div>
      <audio src={track} ref={audio} onLoadedMetadata={onLoadedMetadata} />
    </div>
  );
};

export default DisplayTrack;
