import { Button } from '@material-ui/core';
import React from 'react';
import styles from './RedirectLink.module.sass';

const RedirectLink = (props) => {
  const { outerUrl, isActive } = props.codeData;

  return (
    <>
      {isActive ? (
        <>
          <div className={styles.text}>
            <span>
              URL: <span className={styles.url}>{outerUrl}</span>
            </span>
          </div>
          <a href={outerUrl} target="_blank" rel="noopener noreferrer">
            <Button className={styles.urlBtn}>GO</Button>
          </a>
        </>
      ) : (
        <div className={styles.text}>Sorry, but this link was deactivated</div>
      )}
    </>
  );
};

export default RedirectLink;
