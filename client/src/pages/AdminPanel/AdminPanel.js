import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import AllUsers from '../../components/AdminPanel/AllUsers';
import CreateUser from '../../components/AdminPanel/CreateUser';
import { ADMIN_PANEL_STATES } from '../../constants';
import styles from './AdminPanel.module.sass';

const AdminPanel = (props) => {
  const { CREATE_USER, FIND_USER, ALL_USERS } = ADMIN_PANEL_STATES;
  const { switcherId } = useParams();
  const { history } = props;

  const setSwitcherHandler = (e) => {
    // !!! useCallback
    history.push(e.currentTarget.dataset.id);
  };

  const redirectWrongId = () => {
    if (switcherId !== CREATE_USER || FIND_USER || ALL_USERS)
      history.push(ALL_USERS);
  };

  const renderContent = () => {
    switch (switcherId) {
      case ALL_USERS:
        return <AllUsers />;

      case FIND_USER:
        return <div>Find user</div>;

      case CREATE_USER:
        return <CreateUser history={history} ALL_USERS={ALL_USERS} />;

      default:
        return <AllUsers />;
    }
  };

  useEffect(() => {
    redirectWrongId();
  }, []);

  return (
    <div className={styles.panelContainer}>
      <div className={styles.leftCol}>
        <Button data-id={ALL_USERS} onClick={setSwitcherHandler}>
          All Users
        </Button>

        <Button data-id={FIND_USER} onClick={setSwitcherHandler}>
          Find User
        </Button>

        <Button data-id={CREATE_USER} onClick={setSwitcherHandler}>
          Create User
        </Button>
      </div>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default withRouter(AdminPanel);
