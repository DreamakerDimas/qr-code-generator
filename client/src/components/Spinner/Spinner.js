import React from 'react';
import { BounceLoader } from 'react-spinners';
import styles from './Spinner.module.sass';

const Spinner = (props) => {
  return (
    <div className={styles.spinnerContainer}>
      <BounceLoader size={60} color="#72DAC5" />
    </div>
  );
};

export default Spinner;
