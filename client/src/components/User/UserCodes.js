import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserCodesAction } from '../../actions/actionCreator';

import QRCardsList from '../../components/QRCardsList/QRCardsList';
import AdminQRCreateForm from '../QRCreateForm/AdminQRCreateForm';

const UserCodes = (props) => {
  const { getUserCodes, user } = props;
  const { isFetching, error, userCodes, userData } = user;

  useEffect(() => {
    getUserCodes(userData.id);
  }, []);

  return (
    <>
      <AdminQRCreateForm userData={userData} />

      <QRCardsList
        codesArr={userCodes}
        userId={userData.id}
        isAdminPanel={true}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  getUserCodes: (id) => dispatch(getUserCodesAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCodes);
