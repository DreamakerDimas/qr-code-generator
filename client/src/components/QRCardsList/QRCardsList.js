import React from 'react';
import QRCard from '../../components/QRCard/QRCard';

const QRCardsList = (props) => {
  const { codesArr } = props;

  const renderCodesList = () => {
    return codesArr.map((code) => <QRCard key={code.id} code={code} />);
  };

  return <div>{renderCodesList()}</div>;
};

export default QRCardsList;
