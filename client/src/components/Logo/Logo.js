import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.sass';

const logoSrc = process.env.PUBLIC_URL + '/svg/logo.svg';

const Logo = () => {
  return (
    <div className={styles.imgContainer}>
      <Link to="/">
        <img src={logoSrc} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
