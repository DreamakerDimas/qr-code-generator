import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Grid } from '@material-ui/core';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileAction } from '../../actions/actionCreator';
import UserMenu from './UserMenu';
import { logoutAction } from '../../actions/actionCreator';

const Header = (props) => {
  const { profile, auth, getProfile, logout } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, [auth]);

  useEffect(() => {
    setUser(profile.data);
  }, [profile]);

  const renderButtons = () => {
    return (
      <>
        {user ? (
          <UserMenu user={user} logout={logout} />
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </>
    );
  };

  return (
    <AppBar color="primary" position="static">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={1}>
          <Logo />
        </Grid>
        <Grid
          container
          xs={11}
          direction="row"
          justify="flex-end"
          align="center"
        >
          {renderButtons()}
        </Grid>
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  const { profile, auth } = state;
  return { profile, auth };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfileAction()),
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
