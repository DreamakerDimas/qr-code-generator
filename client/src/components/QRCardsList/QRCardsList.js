import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyCodes } from '../../actions/actionCreator';

import QRCard from '../../components/QRCard/QRCard';

const QRCardsList = (props) => {
  const { isFetching, error, codesArr } = props.qrCodes;

  const renderCodesList = (codes) => {
    return codes.map((code) => <QRCard key={code.id} code={code} />);
  };

  return <div>{isFetching ? 'loading' : renderCodesList(codesArr)}</div>;
};

export default QRCardsList;
