import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUsersAction } from '../../actions/actionCreator';
import UserInfo from '../User/UserInfo';
import { ADMIN_PANEL_STATES } from '../../constants';
import { Button } from '@material-ui/core';
import styles from './AllUsers.module.sass';

const { ALL_USERS } = ADMIN_PANEL_STATES;

const AllUsers = (props) => {
  const { users, getUsers, history } = props;

  useEffect(() => {
    getUsers();
  }, []);

  const detailsHandler = (id) => {
    history.push(`${ALL_USERS}/${id}`);
  };

  const renderUsers = () => {
    return users.usersArr.map((user) => {
      return (
        <div className={styles.userContainer} key={user.id}>
          <UserInfo user={user} />

          <Button onClick={() => detailsHandler(user.id)}>Details</Button>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      {users.isFetching ? 'loading' : renderUsers()}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

const mapDispatchTopProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchTopProps)(AllUsers)
);
