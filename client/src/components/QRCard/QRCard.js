import React from 'react';

const QRCard = () => {
  return (
    <div className="cardContainer">
      <div className="imgContainer">
        <img alt="QRCode" />
      </div>
      <div className="dataContainer">
        <h3>Name</h3>
        <p>URL</p>
        <p>isActive</p>
      </div>
    </div>
  );
};

export default QRCard;
