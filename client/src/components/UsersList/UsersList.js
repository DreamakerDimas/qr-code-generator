import { Button } from '@material-ui/core';
import React from 'react';
import UserInfo from '../User/UserInfo';
import styles from './UsersList.module.sass';

const UsersList = (props) => {
  const { usersArr, detailsHandler } = props;

  return (
    <div className={styles.container}>
      {usersArr.map((user) => {
        return (
          <div className={styles.userContainer} key={user.id}>
            <UserInfo user={user} />

            <Button onClick={() => detailsHandler(user.id)}>Details</Button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
