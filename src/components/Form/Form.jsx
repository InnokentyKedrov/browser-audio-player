import { useRef } from 'react';
import style from './Form.module.css';

const Form = ({ setTrack }) => {
  const inputRef = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    setTrack(inputRef.current.value);
  };

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <label className={style.form__label} htmlFor=''>
        Insert the link
      </label>
      <div className={style.form__input_wrapper}>
        <input className={style.form__input} ref={inputRef} type='text' placeholder='http://' />
        <button className={style.form__button} type='submit' />
      </div>
    </form>
  );
};

export default Form;
