import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import AllUsers from '../../components/AdminPanel/AllUsers';
import CreateUser from '../../components/AdminPanel/CreateUser';
import { ADMIN_PANEL_STATES } from '../../constants';

const AdminPanel = (props) => {
  const { CREATE_USER, FIND_USER, ALL_USERS } = ADMIN_PANEL_STATES;
  const { switcherId } = useParams();
  const { history } = props;

  const setSwitcherHandler = (e) => {
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
    }
  };

  useEffect(() => {
    redirectWrongId();
  }, []);

  return (
    <div className="container">
      <div className="leftCol">
        <button data-id={ALL_USERS} onClick={setSwitcherHandler}>
          All Users
        </button>
        <button data-id={FIND_USER} onClick={setSwitcherHandler}>
          Find User
        </button>
        <button data-id={CREATE_USER} onClick={setSwitcherHandler}>
          Create User
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default withRouter(AdminPanel);
