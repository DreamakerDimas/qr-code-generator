import React from 'react';
import styles from './Logo.module.scss';

const logoSrc = process.env.PUBLIC_URL + '/svg/logo.svg'

const Logo = () => {
    return (
    <div className={styles.imgContainer}>  // styles problem
        <img src={logoSrc} alt="logo" />
    </div>
    )
}

export default Logo;