import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ACCESS_TOKEN, ADMIN_PANEL_STATES } from '../../constants';
import styles from './UserMenu.module.sass';

const UserMenu = (props) => {
  const { ALL_USERS } = ADMIN_PANEL_STATES;
  const { user, logout, history } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = () => {
    history.push(`/admin_panel/${ALL_USERS}`);
    handleClose();
  };

  const handleCodes = () => {
    history.push('/codes');
    handleClose();
  };

  const handleProfile = () => {
    history.push('/profile');
    handleClose();
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN);
    logout();
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.menuBut}
      >
        {user.name} <MoreVertIcon />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {user.role === 'ADMIN' && (
          <MenuItem onClick={handleAdmin}>Admin Panel</MenuItem>
        )}
        <MenuItem onClick={handleCodes}>QR Codes</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(UserMenu);
