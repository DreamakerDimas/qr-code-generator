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
                <ListItemText primary="Name:"></ListItemText>
                <ListItemText primary={user.name}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary="Email:"></ListItemText>
                <ListItemText primary={user.email}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary="Role:"></ListItemText>
                <ListItemText primary={user.role}></ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileDisplay;
