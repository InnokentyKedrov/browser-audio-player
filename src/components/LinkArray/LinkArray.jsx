import styles from './LinkArray.module.css';

const LinkArray = ({ linkArray, setTrack, setIsListFocus }) => {
  const onClick = (e) => {
    setTrack(e.target.textContent);
  };

  return (
    <ul
      className={styles.linkArray__list}
      style={linkArray.length > 4 ? { height: '200px', overflowY: 'scroll' } : undefined}
      onMouseEnter={() => setIsListFocus(true)}
      onMouseLeave={() => setIsListFocus(false)}
    >
      {linkArray.map((el) => {
        return (
          <li className={styles.linkArray__item} key={el} onClick={onClick}>
            {el}
          </li>
        );
      })}
    </ul>
  );
};

export default LinkArray;
