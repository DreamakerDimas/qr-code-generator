import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyCodes } from '../../actions/actionCreator';

import QRCard from '../../components/QRCard/QRCard';
import QRCardsList from '../../components/QRCardsList/QRCardsList';
import QRCreateForm from '../../components/QRCreateForm/QRCreateForm';

const QRCodes = (props) => {
  const { getCodes, qrCodes } = props;
  const { isFetching, error, codesArr } = qrCodes;

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <>
      <QRCreateForm />

      <QRCardsList codesArr={codesArr} />
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
