import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Grid } from '@material-ui/core';
import Logo from '../Logo/Logo';
import { connect } from 'react-redux';
import { getProfileAction } from '../../actions/actionCreator';
import UserMenu from './UserMenu';
import { logoutAction } from '../../actions/actionCreator';
import { withRouter } from 'react-router';
import styles from './Header.module.sass';

const Header = (props) => {
  const { profile, auth, getProfile, logout, history } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, [auth]);

  useEffect(() => {
    setUser(profile.data);
  }, [profile]);

  const loginHandler = () => {
    history.push('/login');
  };

  return (
    <AppBar color="primary" position="static">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={1}>
          <Logo />
        </Grid>

        <Grid className={styles.menuContainer} item xs={11}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            {user ? (
              <UserMenu className={styles.menu} user={user} logout={logout} />
            ) : (
              <Button className={styles.loginBut} onClick={loginHandler}>
                LOGIN
              </Button>
            )}
          </Grid>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
