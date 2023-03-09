import React from 'react';
import styles from './LinkArray.module.css';

interface PropsLinkArrayType {
  linkArray: string[];
  setTrack: React.Dispatch<React.SetStateAction<string | null>>;
  setIsListFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkArray = ({ linkArray, setTrack, setIsListFocus }: PropsLinkArrayType) => {
  const onClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setTrack(event.currentTarget.textContent);
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
