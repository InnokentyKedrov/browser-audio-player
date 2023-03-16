import React from 'react';
import { useEffect, useRef, useState } from 'react';
import LinkArray from '../LinkArray/LinkArray';
import style from './Form.module.css';

interface SetTrackType {
  setTrack: React.Dispatch<React.SetStateAction<string | null>>;
}

const Form = ({ setTrack }: SetTrackType) => {
  const [error, setError] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isListFocus, setIsListFocus] = useState(false);
  const [linkArray, setLinkArray] = useState(
    JSON.parse(localStorage.getItem('linkArray') || '""') || [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const fakeAudio = useRef<HTMLAudioElement>(null);

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (inputRef.current) {
      checkUrl(inputRef.current.value);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (event.keyCode === 13) {
      event.currentTarget.blur();
    }
  };

  const checkUrl = (url: string) => {
    let error: string;

    const check = () => {
      if (fakeAudio.current) {
        fakeAudio.current.src = url;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fakeAudio.current.addEventListener('error', (e: any) => {
          if (e.target as HTMLAudioElement) {
            switch (e.target.error.code) {
              case e.target.error.MEDIA_ERR_ABORTED:
                error = 'You aborted the media playback.';
                break;
              case e.target.error.MEDIA_ERR_NETWORK:
                error = 'A network error caused the media download to fail.';
                break;
              case e.target.error.MEDIA_ERR_DECODE:
                error =
                  'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.';
                break;
              case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                error =
                  'The media could not be loaded, either because the server or network failed or because the format is not supported.';
                break;
              default:
                error = 'An unknown media error occurred.';
                break;
            }
            setError(error);
          }
        });
      }
    };

    if (!url) setError('This field is required.');
    else if (
      !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        url,
      )
    )
      setError('This expression is not a valid link.');
    else {
      check();
    }
    if (fakeAudio.current) {
      fakeAudio.current.addEventListener('loadedmetadata', () => {
        if (!linkArray.includes(url)) {
          setLinkArray([...linkArray, url]);
          localStorage.setItem('linkArray', JSON.stringify([...linkArray, url]));
        }
        setTrack(url);
      });
    }
  };

  useEffect(() => {
    if (isInputFocus || isListFocus) setIsFocus(true);
    else setIsFocus(false);
  }, [isInputFocus, isListFocus]);

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <label className={style.form__label} htmlFor='inputLink'>
        Insert the link
      </label>
      <div className={style.form__input_wrapper}>
        <input
          id='inputLink'
          className={`${style.form__input} ${error && style.form__input_error}`}
          ref={inputRef}
          type='text'
          placeholder='https://'
          onChange={() => setError('')}
          onFocus={() => {
            setIsInputFocus(true);
            setError('');
          }}
          onBlur={() => setIsInputFocus(false)}
          onKeyUp={onKeyDown}
          autoComplete='off'
        />
        <button
          className={`${style.form__button} ${error && style.form__button_error}`}
          type='submit'
        />
        {linkArray.length && isFocus ? (
          <LinkArray {...{ linkArray, setTrack, setIsListFocus }} />
        ) : (
          <></>
        )}
        <span className={style.form__error}>{error}</span>
      </div>
      <audio ref={fakeAudio} />
    </form>
  );
};

export default Form;
