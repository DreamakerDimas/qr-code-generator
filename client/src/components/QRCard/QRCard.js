import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import styles from './QRCard.module.sass';

const QRCard = (props) => {
  const { fileUrl, name, outerUrl, innerUrl, isActive } = props.code;

  return (
    <Card className={styles.cardContainer}>
      <CardContent className={styles.cardImageCont}>
        <img src={fileUrl} alt="QRCode" />
      </CardContent>

      <CardContent className={styles.cardContent}>
        <Typography className={styles.contentName} component="h5" variant="h5">
          Name: {name}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Destination URL: {outerUrl}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Encoded URL: {innerUrl}
        </Typography>

        <Typography className={styles.contentStatus}>
          {isActive ? (
            <div className={styles.statusActive}>ACTIVE</div>
          ) : (
            <div className={styles.statusDisabled}>DISABLED</div>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QRCard;
