import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from './ProfileDisplay.module.sass';

const ProfileDisplay = (props) => {
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
        <Card className={styles.profileCard}>
          <CardHeader
            className={styles.cardHeader}
            title="Your Profile"
            subheader={registeredAt}
          />

          <CardContent className={styles.cardContent}>
            <List className={styles.listContainer}>
              {/* Name */}
              <ListItem className={styles.listItem}>
                <ListItemText className={styles.textItem} primary="Name:" />
                <ListItemText className={styles.textItem} primary={user.name} />
              </ListItem>

              {/* Email */}
              <ListItem className={styles.listItem}>
                <ListItemText className={styles.textItem} primary="Email:" />
                <ListItemText
                  className={styles.textItem}
                  primary={user.email}
                />
              </ListItem>

              {/* Role */}
              <ListItem className={styles.listItem}>
                <ListItemText className={styles.textItem} primary="Role:" />
                <ListItemText className={styles.textItem} primary={user.role} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileDisplay;
