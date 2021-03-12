import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from './UserInfo.module.sass';

const UserInfo = (props) => {
  const { user } = props;
  const [registeredAt, setRegisteredAt] = useState(null);

  useEffect(() => {
    if (user)
      setRegisteredAt(
        `Registered At: ${new Date(user.createdAt).toLocaleDateString()}`
      );
  }, [user]);

  return (
    <>
      {user && (
        <Card className={styles.cardContainer}>
          <CardHeader className={styles.cardHeader} title={user.name} />

          <CardContent className={styles.cardContent}>
            <List>
              <ListItem>
                <ListItemText primary="Email:" />
                <ListItemText primary={user.email} />
              </ListItem>

              <ListItem>
                <ListItemText primary="Role:" />
                <ListItemText primary={user.role} />
              </ListItem>

              <ListItem>
                <ListItemText primary={registeredAt} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserInfo;
