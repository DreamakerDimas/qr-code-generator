import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearMyCodesAction, getMyCodes } from '../../actions/actionCreator';

import QRCardsList from '../../components/QRCardsList/QRCardsList';
import QRCreateForm from '../../components/QRCreateForm/QRCreateForm';
import Spinner from '../../components/Spinner/Spinner';

const QRCodes = (props) => {
  const { getCodes, clearCodes, qrCodes } = props;
  const { isFetching, error, codesArr, haveMore, settings } = qrCodes;

  useEffect(() => {
    getCodes(settings);

    return clearCodes;
  }, []);

  // scroll lazy load
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const isLoadNotNeed =
        !haveMore ||
        isFetching ||
        currentPosition !== document.documentElement.offsetHeight;

      if (isLoadNotNeed) return;

      getCodes(settings);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, haveMore, settings]);

  return (
    <>
      <QRCreateForm />

      <QRCardsList codesArr={codesArr} />

      {isFetching && (
        <center>
          <Spinner />
        </center>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { qrCodes } = state;
  return { qrCodes };
};

const mapDispatchToProps = (dispatch) => ({
  getCodes: (settings) => dispatch(getMyCodes(settings)),
  clearCodes: () => dispatch(clearMyCodesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QRCodes);
