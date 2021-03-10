import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import { deleteUserAction, getUserAction } from '../../actions/actionCreator';
import UserEdit from '../../components/User/UserEdit';
import UserInfo from '../../components/User/UserInfo';

const UserPage = (props) => {
  const { getUser, deleteUser, user, history } = props;
  const { id } = useParams();
  const { userData } = user;

  const [showEdit, setShowEdit] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  const showEditHandler = () => {
    setShowEdit((prev) => !prev);
  };

  const showCodesHandler = () => {
    setShowCodes((prev) => !prev);
  };

  const deleteHandler = () => {
    deleteUser(id, history);
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div>
      <UserInfo user={userData} />
      <Button onClick={showCodesHandler}>Show QR Codes</Button>
      <Button onClick={showEditHandler}>Edit</Button>
      <Button onClick={deleteHandler}>Delete</Button>
      {showEdit && <UserEdit user={userData} />}
      {showCodes && <div>Codes</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUserAction(id)),
  deleteUser: (id, history) => dispatch(deleteUserAction(id, history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
);
