import React from 'react';
import {AppBar, Button} from '@material-ui/core';
import Logo from '../Logo/Logo'

// user
const Header = () => {
    return (
    <AppBar color="primary" position="fixed">
        <Logo />
        <Button>QR Generator</Button>
        <Button>Profile</Button>
        <Button>LogOut</Button>
    </AppBar>)
}

export default Header;