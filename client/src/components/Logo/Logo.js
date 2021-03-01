import React from 'react';
import styles from './Logo.module.sass';

const logoSrc = process.env.PUBLIC_URL + '/svg/logo.svg';

const Logo = () => {
  return (
    <div className={styles.imgContainer}>
      <img src={logoSrc} alt="logo" />
    </div>
  );
};

export default Logo;
