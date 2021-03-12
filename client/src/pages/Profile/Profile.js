import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileDisplay from '../../components/Profile/ProfileDisplay';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import styles from './Profile.module.sass';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // route

  useEffect(() => {
    setUser(props.profile.data);
  }, [props.profile.data]);

  const changePageHandler = () => {
    // !!! useCallback
    setIsEdit((prev) => !prev);
  };

  return (
    <div className={styles.profileContainer}>
      {isEdit ? (
        <>
          <ProfileEdit user={user} />
          <Button className={styles.backBut} onClick={changePageHandler}>
            Back
          </Button>
        </>
      ) : (
        <>
          <ProfileDisplay user={user} />
          <Button className={styles.editBut} onClick={changePageHandler}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state;
  return { profile };
};

export default connect(mapStateToProps, null)(Profile);
