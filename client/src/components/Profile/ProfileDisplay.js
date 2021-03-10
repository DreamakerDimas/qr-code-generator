import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
        <Card>
          <CardHeader title="Your Profile Settings" subheader={registeredAt} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary="Name:" />
                <ListItemText primary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email:" />
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Role:" />
                <ListItemText primary={user.role} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileDisplay;
