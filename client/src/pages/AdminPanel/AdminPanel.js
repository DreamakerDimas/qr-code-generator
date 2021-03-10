import React, { useState } from 'react';

const switcherStates = {
  CREATE_USER: 'CREATE_USER',
  FIND_USER: 'FIND_USER',
  ALL_USERS: 'ALL_USERS',
};

const AdminPanel = (props) => {
  const { CREATE_USER, FIND_USER, ALL_USERS } = switcherStates;
  const [switcherId, setSwitcherId] = useState(ALL_USERS);

  return (
    <div className="container">
      <div className="leftCol">
        <button>All Users</button>
        <button>Find User</button>
        <button>Create User</button>
      </div>
      <div className="content"></div>
    </div>
  );
};

export default AdminPanel;
