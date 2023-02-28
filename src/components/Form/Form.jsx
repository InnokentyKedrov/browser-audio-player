import style from './Form.module.css';

const Form = () => {

  const onSubmit = (e) => {
    console.log(e);
  }
  
  return (
    <form className={style.form}>
      <label className={style.form__label} htmlFor="">Insert the link</label>
      <div className={style.form__input_wrapper}>
        <input className={style.form__input} type="text" placeholder="http://" />
        <input className={style.form__button} type="button" value="" onSubmit={onSubmit} />
      </div>
    </form>
  )
}

export default Form;