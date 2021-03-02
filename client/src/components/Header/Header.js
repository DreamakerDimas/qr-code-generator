import React from 'react';
import { AppBar, Button, Toolbar, Grid } from '@material-ui/core';
import Logo from '../Logo/Logo';

// user
const Header = () => {
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
          <Button>QR Generator</Button>
          <Button>/UserName/</Button>
          {/* userName:hover -> Menu(profile, logout) */}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
