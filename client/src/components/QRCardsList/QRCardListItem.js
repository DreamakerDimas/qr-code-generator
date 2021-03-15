import React from 'react';
import QRCard from '../../components/QRCard/QRCard';
import { Button } from '@material-ui/core';
import styles from './QRCardListItem.module.sass';

const QRCardListItem = (props) => {
  const { code, updateHandler, deleteHandler } = props;

  return (
    <div className={styles.cardItem}>
      <QRCard code={code} />

      <Button
        className={styles.statusBut}
        onClick={() => updateHandler(code.id, code.isActive)}
      >
        CHANGE STATUS
      </Button>

      <Button
        className={styles.deleteBut}
        onClick={() => deleteHandler(code.id)}
      >
        DELETE
      </Button>
    </div>
  );
};

export default QRCardListItem;
