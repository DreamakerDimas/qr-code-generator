import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileDisplay from '../../components/Profile/ProfileDisplay';
import ProfileEdit from '../../components/Profile/ProfileEdit';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setUser(props.profile.data);
  }, [props.profile.data]);

  const changePageHandler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      {isEdit ? (
        <>
          <Button onClick={changePageHandler}>Back</Button>
          <ProfileEdit user={user} />
        </>
      ) : (
        <>
          <Button onClick={changePageHandler}>Edit</Button>
          <ProfileDisplay user={user} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state;
  return { profile };
};

export default connect(mapStateToProps, null)(Profile);
