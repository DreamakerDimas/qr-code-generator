import React, { useEffect } from 'react';
import QRCard from '../../components/QRCard/QRCard';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  deleteMyCode,
  deleteUserCodeAction,
  updateMyCode,
  updateUserCodeAction,
} from '../../actions/actionCreator';
import styles from './QRCardsList.module.sass';

const QRCardsList = (props) => {
  const {
    codesArr,
    isAdminPanel,
    userId,
    updateUserCodeStatus,
    deleteUserCode,
    updateMyCodeStatus,
    deleteMyCode,
  } = props;

  const updateHandler = (id, currentStatus) => {
    if (isAdminPanel) {
      updateUserCodeStatus({ id, userId, isActive: !currentStatus });
    } else {
      updateMyCodeStatus({ id, isActive: !currentStatus });
    }
  };

  const deleteHandler = (id) => {
    if (isAdminPanel) {
      deleteUserCode({ id, userId });
    } else {
      deleteMyCode(id);
    }
  };

  const renderCodesList = () => {
    // !!! QRCardListItem
    return codesArr.map((code) => (
      <div className={styles.cardItem} key={code.id}>
        <QRCard code={code} />

        <Button
          className={styles.statusBut}
          onClick={() => updateHandler(code.id, code.isActive)}
        >
          CHANGE STATUS
        </Button>

        <Button
          className={styles.deleteBut}
          onClick={() => deleteHandler(code.id)}
        >
          DELETE
        </Button>
      </div>
    ));
  };

  return <div className={styles.cardsContainer}>{renderCodesList()}</div>;
};

const mapDispatchToProps = (dispatch) => ({
  updateUserCodeStatus: (data) => dispatch(updateUserCodeAction(data)),
  deleteUserCode: (data) => dispatch(deleteUserCodeAction(data)),
  updateMyCodeStatus: (data) => dispatch(updateMyCode(data)),
  deleteMyCode: (data) => dispatch(deleteMyCode(data)),
});

export default connect(null, mapDispatchToProps)(QRCardsList);
