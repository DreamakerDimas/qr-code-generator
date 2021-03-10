import { InputLabel } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileAction } from '../../actions/actionCreator';

const ProfileEdit = (props) => {
  const { user, handleSubmit, submitting, updateProfile } = props;

  const submitHandler = (values) => {
    updateProfile(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <InputLabel htmlFor="name">
          Currently account name is: "{user.name}"
        </InputLabel>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Your Name"
        />
        <InputLabel htmlFor="email">
          Currently your email is: "{user.email}"
        </InputLabel>
        <Field
          name="email"
          component="input"
          type="text"
          placeholder="Email Address"
        />
        {/* error */}
        <button type="submit" disabled={submitting}>
          EDIT
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'userUpdate' })(ProfileEdit));
