import { InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { updateUserAction } from '../../actions/actionCreator';
import { ROLES } from '../../constants';

const { USER, ADMIN } = ROLES;

const UserEdit = (props) => {
  const { user, handleSubmit, submitting, updateUser } = props;
  const { id } = useParams();

  const submitHandler = (values) => {
    const payload = { id, body: values };
    updateUser(payload);
  };

  return (
    <>
      {user && (
        <div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputLabel htmlFor="name">
              Currently name is: "{user.name}"
            </InputLabel>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />
            <InputLabel htmlFor="email">
              Currently email is: "{user.email}"
            </InputLabel>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email Address"
            />
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
            <Field name="role" component="select">
              <option value={USER}>User</option>
              <option value={ADMIN}>Admin</option>
            </Field>
            {/* error */}
            <button type="submit" disabled={submitting}>
              EDIT
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUserAction(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'userUpdate' })(UserEdit));
