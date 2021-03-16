import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteMyCode,
  deleteUserCodeAction,
  updateMyCode,
  updateUserCodeAction,
} from '../../actions/actionCreator';
import styles from './QRCardsList.module.sass';
import QRCardListItem from './QRCardListItem';

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

  const updateHandler = useCallback(
    (id, currentStatus) => {
      if (isAdminPanel) {
        updateUserCodeStatus({ id, userId, isActive: !currentStatus });
      } else {
        updateMyCodeStatus({ id, isActive: !currentStatus });
      }
    },
    [userId, isAdminPanel]
  );

  const deleteHandler = useCallback(
    (id) => {
      if (isAdminPanel) {
        deleteUserCode({ id, userId });
      } else {
        deleteMyCode(id);
      }
    },
    [userId, isAdminPanel]
  );

  return (
    <div className={styles.cardsContainer}>
      {codesArr.map((code) => (
        <QRCardListItem
          key={code.id}
          code={code}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUserCodeStatus: (data) => dispatch(updateUserCodeAction(data)),
  deleteUserCode: (data) => dispatch(deleteUserCodeAction(data)),
  updateMyCodeStatus: (data) => dispatch(updateMyCode(data)),
  deleteMyCode: (data) => dispatch(deleteMyCode(data)),
});

export default connect(null, mapDispatchToProps)(QRCardsList);
