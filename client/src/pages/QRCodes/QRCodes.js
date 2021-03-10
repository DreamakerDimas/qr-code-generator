import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyCodes } from '../../actions/actionCreator';

import QRCard from '../../components/QRCard/QRCard';
import QRCardsList from '../../components/QRCardsList/QRCardsList';
import QRCreateForm from '../../components/QRCreateForm/QRCreateForm';

const QRCodes = (props) => {
  const { getCodes, qrCodes } = props;
  const { isFetching, error, codesArr } = qrCodes;
  console.log(codesArr);

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <>
      <QRCreateForm />
      <QRCardsList qrCodes={qrCodes} />
    </>
  );
};

const mapStateToProps = (state) => {
  const { qrCodes } = state;
  return { qrCodes };
};

const mapDispatchToProps = (dispatch) => ({
  getCodes: () => dispatch(getMyCodes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QRCodes);

// https://storage.googleapis.com/qr-code-generator-bucket/b590d8d1-4780-48af-bc9f-0290282a30e4/0ecd0755-13aa-4bae-adcd-873f9396bfb8.png
