import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';

const QRCard = (props) => {
  const { fileUrl, name, outerUrl, innerUrl, isActive } = props.code;

  return (
    <Card>
      <CardContent>
        <img src={fileUrl} alt="QRCode" />
      </CardContent>
      <CardContent>
        <Typography component="h5" variant="h5">
          Name: {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Destination URL: {outerUrl}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Encoded URL: {innerUrl}
        </Typography>
        {isActive ? <div>ACTIVE (GREEN)</div> : <div>DISABLE (RED)</div>}
      </CardContent>
    </Card>
  );
};

export default QRCard;
