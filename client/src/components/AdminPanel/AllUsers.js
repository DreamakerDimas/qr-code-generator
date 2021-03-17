import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  clearAllUsersAction,
  getUsersAction,
} from '../../actions/actionCreator';
import UserInfo from '../User/UserInfo';
import { ADMIN_PANEL_STATES } from '../../constants';
import { Button } from '@material-ui/core';
import styles from './AllUsers.module.sass';
import Spinner from '../Spinner/Spinner';
import UsersList from '../UsersList/UsersList';

const { ALL_USERS } = ADMIN_PANEL_STATES;

const AllUsers = (props) => {
  const { users, getUsers, clearUsers, history } = props;
  const { isFetching, error, haveMore, settings } = users;

  useEffect(() => {
    getUsers(settings);

    return clearUsers;
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

      getUsers(settings);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, haveMore, settings]);

  const detailsHandler = useCallback(
    (id) => {
      history.push(`${ALL_USERS}/${id}`);
    },
    [history]
  );

  return (
    <>
      <UsersList usersArr={users.usersArr} detailsHandler={detailsHandler} />

      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

const mapDispatchTopProps = (dispatch) => ({
  getUsers: (settings) => dispatch(getUsersAction(settings)),
  clearUsers: () => dispatch(clearAllUsersAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchTopProps)(AllUsers)
);
