import { Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import {
  clearUserStoreAction,
  deleteUserAction,
  getUserAction,
} from '../../actions/actionCreator';
import Spinner from '../../components/Spinner/Spinner';
import UserCodes from '../../components/User/UserCodes';
import UserEdit from '../../components/User/UserEdit';
import UserInfo from '../../components/User/UserInfo';
import styles from './UserPage.module.sass';

const UserPage = (props) => {
  const { getUser, deleteUser, clearUser, user, history } = props;
  const { id } = useParams();
  const { userData, isLoadingCodes } = user;

  const [showEdit, setShowEdit] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  const showEditHandler = useCallback(() => {
    setShowEdit((prev) => !prev);
  }, []);

  const showCodesHandler = useCallback(() => {
    setShowCodes((prev) => !prev);
  }, []);

  const deleteHandler = useCallback(() => {
    deleteUser(id, history);
  }, [id, history]);

  useEffect(() => {
    getUser(id);

    return clearUser;
  }, []);
  console.log(user.isFetching);
  return (
    <>
      {user.isFetching ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <div className={styles.outerContainer}>
          <UserInfo user={userData} />

          <div className={styles.buttonsContainer}>
            <Button onClick={showCodesHandler}>Show QR Codes</Button>

            <Button onClick={showEditHandler}>Edit</Button>

            <Button onClick={deleteHandler}>Delete</Button>
          </div>

          {showEdit && <UserEdit user={userData} />}
          {showCodes && <UserCodes />}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUserAction(id)),
  deleteUser: (id, history) => dispatch(deleteUserAction(id, history)),
  clearUser: () => dispatch(clearUserStoreAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
);
