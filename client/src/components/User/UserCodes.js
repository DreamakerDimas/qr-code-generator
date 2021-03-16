import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  clearUserCodesAction,
  getUserCodesAction,
} from '../../actions/actionCreator';

import QRCardsList from '../../components/QRCardsList/QRCardsList';
import AdminQRCreateForm from '../QRCreateForm/AdminQRCreateForm';
import Spinner from '../Spinner/Spinner';

const UserCodes = (props) => {
  const { getUserCodes, clearUserCodes, user } = props;
  const {
    isLoadingCodes,
    error,
    haveMore,
    userCodes,
    userData,
    settings,
  } = user;

  const payload = {
    userId: userData.id,
    limit: settings.limit,
    offset: settings.offset,
  };

  useEffect(() => {
    getUserCodes(payload);

    return clearUserCodes;
  }, []);

  // scroll lazy load
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const isLoadNotNeed =
        !haveMore ||
        isLoadingCodes ||
        currentPosition !== document.documentElement.offsetHeight;

      if (isLoadNotNeed) return;

      getUserCodes(payload);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoadingCodes, haveMore, settings]);

  return (
    <>
      <AdminQRCreateForm userData={userData} />

      <QRCardsList
        codesArr={userCodes}
        userId={userData.id}
        isAdminPanel={true}
      />
      {isLoadingCodes && <Spinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  getUserCodes: (data) => dispatch(getUserCodesAction(data)),
  clearUserCodes: () => dispatch(clearUserCodesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCodes);
