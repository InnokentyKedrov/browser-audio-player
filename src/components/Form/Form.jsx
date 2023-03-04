import { useRef, useState } from 'react';
import style from './Form.module.css';

const Form = ({ setTrack }) => {
  const [error, setError] = useState();
  const [link, setLink] = useState();
  const inputRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    // isValidAudioUrl(inputRef.current.value).then((result) => console.log(result));
    if (!inputRef.current.value) setError('This field is required.');
    else if (
      !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        inputRef.current.value,
      )
    ) {
      setError('This expression is not a valid link.');
    } else {
      setLink(inputRef.current.value);
      setTrack(inputRef.current.value);
    }
    // checkUrl(inputRef.current.value);
    // check(inputRef.current.value);

    // setTrack(inputRef.current.value);
    // if (!duration) setError('This link is not a link to audio.');
  };

  // async function isValidAudioUrl(urlToCheck) {
  //   try {
  //     const res = await fetch(urlToCheck);
  //     console.log('res: ', res);
  //     return res.ok && res.headers.get('content-type').startsWith('audio');
  //   } catch (err) {
  //     return console.log(err.message);
  //   }
  // }

  // const checkUrl = (url) => {
  //   let xhr = new XMLHttpRequest();

  //   xhr.open({ method: 'HEAD', mode: 'no-cors' }, url, false);

  //   try {
  //     xhr.send();
  //     if (xhr.status != 200) {
  //       console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  //     } else {
  //       console.log(xhr.response);
  //     }
  //   } catch (err) {
  //     // для отлова ошибок используем конструкцию try...catch вместо onerror
  //     console.log('Запрос не удался');
  //   }

  //   let headers = xhr
  //     .getAllResponseHeaders()
  //     .split('\r\n')
  //     .reduce((result, current) => {
  //       let [name, value] = current.split(': ');
  //       result[name] = value;
  //       return result;
  //     }, {});

  //   console.log('headers["Content-Type"]: ', headers['content-type']);
  // };

  const onChange = () => {
    setError('');
  };

  return (
    <>
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
            name='input'
            onChange={onChange}
          />
          <button
            className={`${style.form__button} ${error && style.form__button_error}`}
            type='submit'
          />
          <span className={style.form__error}>{error}</span>
        </div>
        <audio src={link} />
      </form>
    </>
  );
};

export default Form;
